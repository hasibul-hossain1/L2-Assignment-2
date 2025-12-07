import userService from "./user.service";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    if (result) {
      res.json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
      errors: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    console.log(req.user);
    if (req.user?.role !== "admin" && req.user?.email !== req.body.email) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const result = await userService.updateUser(id as string, req.body);
    res.json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
      errors: error,
    });
  }
};

export default {
  getAllUsers,
  updateUser,
};
