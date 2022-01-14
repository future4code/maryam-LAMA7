import express from "express";
import { BandController } from "../controller/BandController";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();
const bandController = new BandController()

userRouter.get("/lama/band", bandController.getBandById)
userRouter.post("/lama/signup", userController.signup);
userRouter.post("/lama/login", userController.login);
userRouter.post("/lama/band", bandController.createBand)