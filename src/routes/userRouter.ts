import express from "express";
import { BandController } from "../controller/BandController";
import { ShowController } from "../controller/ShowController";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();
const bandController = new BandController()
const showController = new ShowController()

userRouter.get("/lama/band", bandController.getBandById)
userRouter.get("/lama/show", showController.getShowsByWeekDayController)
userRouter.post("/lama/signup", userController.signup);
userRouter.post("/lama/login", userController.login);
userRouter.post("/lama/band", bandController.createBand)
userRouter.post("/lama/show", showController.registreSohws)
