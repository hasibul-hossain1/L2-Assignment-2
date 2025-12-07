import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import vehicleRoutes from "../modules/vehicle/vehicle.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/vehicles", vehicleRoutes);

router.use("/users", userRoutes);

export default router;
