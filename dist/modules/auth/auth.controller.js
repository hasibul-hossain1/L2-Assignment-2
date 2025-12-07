"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_service_2 = __importDefault(require("./auth.service"));
const signup = async (req, res) => {
    try {
        const result = await auth_service_1.default.signup(req.body);
        const user = result.rows[0];
        const { password, ...rest } = user;
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: rest,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
const signin = async (req, res) => {
    try {
        const result = await auth_service_2.default.signin(req.body);
        res.json({
            success: true,
            message: "Login successful",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!"
        });
    }
};
exports.default = {
    signup,
    signin
};
