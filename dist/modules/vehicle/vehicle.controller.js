"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_service_1 = __importDefault(require("./vehicle.service"));
const createVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.default.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.default.getAllVehicles();
        const data = result.rows;
        if (data.length === 0) {
            return res.json({
                success: true,
                message: "No vehicles found",
                data,
            });
        }
        res.json({
            success: true,
            message: "Vehicles retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
const getVehicleById = async (req, res) => {
    try {
        const id = req.params.vehicleId;
        const result = await vehicle_service_1.default.getVehicleById(id);
        if (result.length === 0) {
            res.json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const id = req.params.vehicleId;
        const result = await vehicle_service_1.default.updateVehicle(id, req.body);
        res.json({
            success: true,
            message: "Vehicle updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const id = req.params.vehicleId;
        const result = await vehicle_service_1.default.deleteVehicle(id);
        if (result) {
            res.json({
                success: true,
                message: "Vehicle deleted successfully",
            });
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message || "Unknown Error!",
        });
    }
};
exports.default = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
