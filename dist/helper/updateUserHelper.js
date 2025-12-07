"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const updateUserHelper = async (req, res) => {
    try {
        const result = await db_1.pool.query(`
            SELECT * FROM users WHERE email = $1
            `, [req.user.email]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Update failed",
            });
        }
        if (req.user?.role !== "admin" && req.user?.id !== result.rows[0].id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        return true;
    }
    catch (error) { }
};
exports.default = updateUserHelper;
