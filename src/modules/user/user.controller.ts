import userService from "./user.service";
import { Request, Response } from "express";
import auth from "../../middleware/auth";

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

export default {
  getAllUsers,
};
