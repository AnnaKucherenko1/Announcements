"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CONNECTION_URI = 'mongodb://127.0.0.1:27017/assignment';
async function main() {
    await mongoose_1.default
        .connect(CONNECTION_URI)
        .then(() => console.log("connected to db 🟦"))
        .catch(err => console.log("Error connecting to DB : ", err));
}
main();
exports.default = mongoose_1.default;
