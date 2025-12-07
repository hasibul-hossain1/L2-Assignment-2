import { Request, Response } from "express";
import bookingService from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
    const {
      rent_start_date: startDate,
      rent_end_date: endDate,
      ...rest
    } = result;
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        rent_start_date:
          new Date(startDate).getDate() +
          "-" +
          (new Date(startDate).getMonth() + 1) +
          "-" +
          new Date(startDate).getFullYear(),
        rent_end_date:
          new Date(endDate).getDate() +
          "-" +
          (new Date(endDate).getMonth() + 1) +
          "-" +
          new Date(endDate).getFullYear(),
        ...rest,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookings(req.user!);
    res.send({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message || "Unknown error",
      errors: error,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.updateBooking(
      req.params.bookingId as string,
      req.body,
      {id:req.user!.id,role:req.user!.role}
    );
    res.send({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown error",
      errors: error,
    });
  }
};

export default {
  createBooking,
  getAllBookings,
  updateBooking,
};
