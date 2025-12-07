"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hash = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
    INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `, [name, email, hash, phone, role]);
    if (result.rows.length === 0) {
        throw new Error('Signup failed!');
    }
    return result;
};
const signin = async (payload) => {
    const { email, password } = payload;
    const result = await db_1.pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);
    if (result.rows.length === 0) {
        throw new Error("signin failed");
    }
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        throw new Error("Password not matched");
    }
    const secret = config_1.config.jwt_secret;
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: "7d" });
    if (!token) {
        throw new Error("Token not generated");
    }
    const { password: pass, ...rest } = user;
    return { token, user: rest };
};
exports.default = {
    signup,
    signin
};
