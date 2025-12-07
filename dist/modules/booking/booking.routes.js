"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = __importDefault(require("./booking.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', booking_controller_1.default.createBooking);
router.get('/', (0, auth_1.default)('admin', 'customer'), booking_controller_1.default.getAllBookings);
router.put('/:bookingId', (0, auth_1.default)('admin', 'customer'), booking_controller_1.default.updateBooking);
exports.default = router;
