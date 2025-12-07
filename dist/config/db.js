"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.pool = void 0;
const pg_1 = require("pg");
const _1 = require(".");
exports.pool = new pg_1.Pool({
    connectionString: _1.config.connection_string,
});
const initDB = async () => {
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin'))
        )
        `);
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
            )`);
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active','cancelled','returned'))
        )
        `);
    await exports.pool.query(`CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);`);
    await exports.pool.query(`CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);`);
};
exports.initDB = initDB;
