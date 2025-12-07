"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const createBooking = async (payload) => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
        const vehicleRes = await db_1.pool.query(`
            SELECT * FROM vehicles WHERE id=$1
            `, [vehicle_id]);
        if (vehicleRes.rows.length === 0) {
            throw new Error("Vehicle not found");
        }
        const vehicle = vehicleRes.rows[0];
        if (vehicle.availability_status !== "available") {
            throw new Error("Vehicle is already booked");
        }
        const start = new Date(rent_start_date);
        const end = new Date(rent_end_date);
        const diffMs = end.getTime() - start.getTime();
        if (diffMs < 0) {
            throw new Error("rent_end_date cannot be before rent_start_date");
        }
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1;
        const totalPrice = days * Number(vehicle.daily_rent_price);
        const bookingRes = await db_1.pool.query(`
        INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING *   
             `, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]);
        await db_1.pool.query(`
             UPDATE vehicles SET availability_status='booked' WHERE id=$1 RETURNING *
             `, [vehicle_id]);
        return {
            ...bookingRes.rows[0],
            vehicle: {
                vehicle_name: vehicle.vehicle_name,
                daily_rent_price: vehicle.daily_rent_price,
            },
        };
    }
    catch (error) {
        throw error;
    }
};
const getAllBookings = async (user) => {
    try {
        const [bookingsRes, usersRes, vehiclesRes] = await Promise.all([
            db_1.pool.query(`SELECT * FROM bookings`),
            db_1.pool.query(`SELECT id, name, email FROM users`),
            db_1.pool.query(`SELECT * FROM vehicles`),
        ]);
        const bookings = bookingsRes.rows;
        const users = usersRes.rows;
        const vehicles = vehiclesRes.rows;
        /* ✅ Convert to lookup maps for fast access */
        const userMap = new Map(users.map(u => [u.id, u]));
        const vehicleMap = new Map(vehicles.map(v => [v.id, v]));
        /* ================= ADMIN VIEW ================= */
        if (user.role === "admin") {
            return bookings.map(b => {
                const customer = userMap.get(b.customer_id);
                const vehicle = vehicleMap.get(b.vehicle_id);
                return {
                    id: b.id,
                    customer_id: b.customer_id,
                    vehicle_id: b.vehicle_id,
                    rent_start_date: b.rent_start_date,
                    rent_end_date: b.rent_end_date,
                    total_price: b.total_price,
                    status: b.status,
                    customer: {
                        name: customer?.name,
                        email: customer?.email,
                    },
                    vehicle: {
                        vehicle_name: vehicle?.vehicle_name,
                        registration_number: vehicle?.registration_number,
                    },
                };
            });
        }
        /* ================= CUSTOMER VIEW ================= */
        return bookings
            .filter(b => b.customer_id === user.id)
            .map(b => {
            const vehicle = vehicleMap.get(b.vehicle_id);
            return {
                id: b.id,
                vehicle_id: b.vehicle_id,
                rent_start_date: b.rent_start_date,
                rent_end_date: b.rent_end_date,
                total_price: b.total_price,
                status: b.status,
                vehicle: {
                    vehicle_name: vehicle?.vehicle_name,
                    registration_number: vehicle?.registration_number,
                    type: vehicle?.type,
                },
            };
        });
    }
    catch (error) {
        throw error;
    }
};
const updateBooking = async (bookingId, payload, user) => {
    const client = await db_1.pool.connect();
    try {
        const { status } = payload;
        /* ✅ Validate allowed status */
        if (!["cancelled", "returned"].includes(status)) {
            throw new Error("Invalid status update");
        }
        await client.query("BEGIN");
        /* ✅ Fetch booking */
        const bookingRes = await client.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
        if (bookingRes.rows.length === 0) {
            throw new Error("Booking not found");
        }
        const booking = bookingRes.rows[0];
        /* ✅ CUSTOMER RULE */
        if (user.role === "customer") {
            if (status !== "cancelled") {
                throw new Error("Customers can only cancel bookings");
            }
            if (booking.customer_id !== user.id) {
                throw new Error("Unauthorized booking access");
            }
        }
        /* ✅ ADMIN RULE */
        if (user.role === "admin" && status !== "returned") {
            throw new Error("Admin can only mark as returned");
        }
        /* ✅ Update booking */
        const updatedBookingRes = await client.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId]);
        /* ✅ If returned → update vehicle availability */
        if (status === "returned") {
            await client.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.vehicle_id]);
        }
        await client.query("COMMIT");
        return updatedBookingRes.rows[0];
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
};
exports.default = {
    createBooking,
    getAllBookings,
    updateBooking
};
