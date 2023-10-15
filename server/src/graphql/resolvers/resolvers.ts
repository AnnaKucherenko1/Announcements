import { ApolloError } from 'apollo-server-errors';
import { editAnnouncement, getAnnouncement, getAnnouncementsByPage, getNumberOfAll } from '../Model/modelDB';

export default {
  Query: {
    getAnnouncement: async (_: any, { _id }: any) => {
      try {
        const announcement = await getAnnouncement(_id);
        return announcement;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
    getAnnouncementsByPage: async (_: any, { page, perPage }: any) => {
      try {
        const announcementsData = await getAnnouncementsByPage(page, perPage);
        return announcementsData;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
    getNumberOfAll: async () => {
      try {
        const count = await getNumberOfAll();
        return count;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    editAnnouncement: async (_: any, { _id, updatedAnnouncement }: any) => {
      try {
        const editedAnnouncement = await editAnnouncement(_id, updatedAnnouncement);
        return editedAnnouncement;
      } catch (error) {
        console.log(error);
        throw new ApolloError(error);
      }
    },
  },
};