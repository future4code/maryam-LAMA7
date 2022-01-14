"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var BandController_1 = require("../controller/BandController");
var UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
var userController = new UserController_1.UserController();
var bandController = new BandController_1.BandController();
exports.userRouter.post("/lama/signup", userController.signup);
exports.userRouter.post("/lama/login", userController.login);
exports.userRouter.post("/lama/band", bandController.createBand);
