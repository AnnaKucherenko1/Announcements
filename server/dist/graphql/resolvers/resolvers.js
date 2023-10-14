"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const modelDB_1 = require("../Model/modelDB");
exports.default = {
    Query: {
        getAnnouncement: async (_, { _id }) => {
            try {
                const announcement = await (0, modelDB_1.getAnnouncement)(_id);
                return announcement;
            }
            catch (error) {
                console.log(error);
                throw new apollo_server_errors_1.ApolloError(error);
            }
        },
        getAnnouncementsByPage: async (_, { page, perPage }) => {
            try {
                const announcementsData = await (0, modelDB_1.getAnnouncementsByPage)(page, perPage);
                return announcementsData;
            }
            catch (error) {
                console.log(error);
                throw new apollo_server_errors_1.ApolloError(error);
            }
        },
        getNumberOfAll: async () => {
            try {
                const count = await (0, modelDB_1.getNumberOfAll)();
                return count;
            }
            catch (error) {
                console.log(error);
                throw new apollo_server_errors_1.ApolloError(error);
            }
        },
    },
    Mutation: {
        editAnnouncement: async (_, { _id, updatedAnnouncement }) => {
            try {
                const editedAnnouncement = await (0, modelDB_1.editAnnouncement)(_id, updatedAnnouncement);
                return editedAnnouncement;
            }
            catch (error) {
                console.log(error);
                throw new apollo_server_errors_1.ApolloError(error);
            }
        },
    },
};
