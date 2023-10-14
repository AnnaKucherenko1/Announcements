"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAnnouncement = exports.getAnnouncement = exports.getNumberOfAll = exports.getAnnouncementsByPage = void 0;
const schemaDB_1 = require("./schemaDB");
async function getAnnouncement(_id) {
    try {
        const announcement = await schemaDB_1.Announcement.findById(_id);
        return announcement;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
exports.getAnnouncement = getAnnouncement;
async function getAnnouncementsByPage(page, perPage) {
    try {
        const skip = (page - 1) * perPage;
        const announcements = await schemaDB_1.Announcement.find({})
            .sort({ id: 1 })
            .skip(skip)
            .limit(perPage);
        return announcements;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
exports.getAnnouncementsByPage = getAnnouncementsByPage;
async function getNumberOfAll() {
    try {
        const count = await schemaDB_1.Announcement.countDocuments({});
        return count;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
exports.getNumberOfAll = getNumberOfAll;
async function editAnnouncement(_id, updatedAnnouncement) {
    try {
        const announcement = await schemaDB_1.Announcement.findByIdAndUpdate(_id, updatedAnnouncement, { new: true });
        if (!announcement) {
            return {
                success: false,
                message: 'Announcement not found',
                updatedAnnouncement: null,
            };
        }
        updatedAnnouncement._id = _id;
        return {
            success: true,
            message: 'Announcement updated successfully',
            updatedAnnouncement: updatedAnnouncement,
        };
    }
    catch (error) {
        console.error(error);
        return error;
    }
}
exports.editAnnouncement = editAnnouncement;
