"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const db_1 = __importDefault(require("./db"));
const announcementSchema = new db_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        default: null,
        required: false,
    },
    lastUpdate: {
        type: String,
        default: null,
        required: false,
    },
    categories: {
        type: [String],
        default: [],
        required: true,
    },
    content: {
        type: String,
        default: null,
        required: true,
    },
});
exports.Announcement = db_1.default.model('Announcement', announcementSchema);
