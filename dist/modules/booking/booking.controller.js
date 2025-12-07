"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_service_1 = __importDefault(require("./booking.service"));
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.default.createBooking(req.body);
        const { rent_start_date: startDate, rent_end_date: endDate, ...rest } = result;
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: {
                rent_start_date: new Date(startDate).getDate() +
                    "-" +
                    (new Date(startDate).getMonth() + 1) +
                    "-" +
                    new Date(startDate).getFullYear(),
                rent_end_date: new Date(endDate).getDate() +
                    "-" +
                    (new Date(endDate).getMonth() + 1) +
                    "-" +
                    new Date(endDate).getFullYear(),
                ...rest,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            errors: error,
        });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const result = await booking_service_1.default.getAllBookings(req.user);
        res.send({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Unknown error",
            errors: error,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const result = await booking_service_1.default.updateBooking(req.params.bookingId, req.body, { id: req.user.id, role: req.user.role });
        res.send({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown error",
            errors: error,
        });
    }
};
exports.default = {
    createBooking,
    getAllBookings,
    updateBooking,
};
