import { Request, Response } from "express";
import vehicleService from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicles();
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const id = req.params.vehicleId;
    const result = await vehicleService.getVehicleById(id as string);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.vehicleId;
    const result = await vehicleService.updateVehicle(id as string, req.body);
    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.vehicleId;
    const result = await vehicleService.deleteVehicle(id as string);
    if (result) {
      res.json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};

export default {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
