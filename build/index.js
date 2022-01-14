"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var userRouter_1 = require("./routes/userRouter");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/band", userRouter_1.userRouter);
var server = app.listen(3000, function () {
    if (server) {
        var address = server.address();
        console.log("Servidor rodando em http://localhost:".concat(address.port));
    }
    else {
        console.error("Falha ao rodar o servidor.");
    }
});
