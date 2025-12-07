"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = __importDefault(require("./vehicle.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), vehicle_controller_1.default.createVehicle);
router.get('/', vehicle_controller_1.default.getAllVehicles);
router.get("/:vehicleId", vehicle_controller_1.default.getVehicleById);
router.put('/:vehicleId', (0, auth_1.default)('admin'), vehicle_controller_1.default.updateVehicle);
router.delete('/:vehicleId', (0, auth_1.default)('admin'), vehicle_controller_1.default.deleteVehicle);
exports.default = router;
