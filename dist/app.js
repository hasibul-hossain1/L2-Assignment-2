"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("The server is working.");
});
app.use('/api/v1', routes_1.default);
app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
exports.default = app;
