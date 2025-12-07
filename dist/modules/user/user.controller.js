"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateUserHelper_1 = __importDefault(require("../../helper/updateUserHelper"));
const user_service_1 = __importDefault(require("./user.service"));
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.default.getAllUsers();
        if (result) {
            res.json({
                success: true,
                message: "Users retrieved successfully",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
            errors: error,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const isAccess = await (0, updateUserHelper_1.default)(req, res);
        if (!isAccess) {
            return;
        }
        const result = await user_service_1.default.updateUser(id, req.body);
        res.json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
            errors: error,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const result = await user_service_1.default.deleteUser(id);
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
            errors: error,
        });
    }
};
exports.default = {
    getAllUsers,
    updateUser,
    deleteUser
};
