import updateUserHelper from "../../helper/updateUserHelper";
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
    const isAccess = await updateUserHelper(req, res);
    if (!isAccess) {
      return;
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userService.deleteUser(id as string);
      res.json({
        success: true,
        message: "User deleted successfully",
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
  deleteUser
};
