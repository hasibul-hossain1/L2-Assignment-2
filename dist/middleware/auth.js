"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - missing token",
                });
            }
            const token = authHeader.split(" ")[1];
            if (!authHeader.startsWith("Bearer")) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - invalid token",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: error.message || "Unknown Error!",
            });
        }
    };
};
exports.default = auth;
