"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_model_1 = require("./models/User.model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (req, res) => {
    try {
        const users = await User_model_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.json(error.message);
    }
});
app.post("/users", async (req, res) => {
    try {
        const users = await User_model_1.User.create(req.body);
        res.json(users);
    }
    catch (error) {
        res.json(error.message);
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    try {
        console.log(`Server had started on port ${PORT}!`);
        mongoose_1.default
            .connect("mongodb://127.0.0.1:27017/september-2022")
            .then(() => console.log("Connected"));
    }
    catch (error) {
        console.log(error);
    }
});
