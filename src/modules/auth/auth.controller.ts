import { Request, Response } from "express";
import userServices from "./auth.service";
import authService from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await userServices.signup(req.body);
    const user = result.rows[0];
    const { password, ...rest } = user;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: rest,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error!",
    });
  }
};


const signin = async (req:Request, res:Response)=>{
    try {
        const result= await authService.signin(req.body)
        res.json({
            success:true,
            message:"Login successful",
            data:result
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message || "Unknown Error!"
        })
    }

}

export default {
  signup,
  signin
};
