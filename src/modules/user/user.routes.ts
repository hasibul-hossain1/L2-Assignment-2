import { Router } from "express";
import userController from './user.controller'
import auth from "../../middleware/auth";

const router= Router()

router.use('/',auth('admin'),userController.getAllUsers)

export default router