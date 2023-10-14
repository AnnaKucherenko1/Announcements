"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnouncementsByPage = void 0;
const schemaDB_1 = require("./schemaDB");
async function getAnnouncementsByPage(page, perPage) {
    try {
        const skip = (page - 1) * perPage;
        const announcements = await schemaDB_1.Announcement.find({}).skip(skip).limit(perPage);
        return announcements;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
exports.getAnnouncementsByPage = getAnnouncementsByPage;
