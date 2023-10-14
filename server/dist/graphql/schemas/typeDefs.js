"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    definitions: `#graphql
  
    type Announcement {
      _id: ID
      title: String!
      publicationDate: String!
      lastUpdate: String!
      categories: [String!]
      content: String!
    }
  
    type Query {
      getAnnouncement(_id: ID!): Announcement
      getAnnouncementsByPage: [Announcement]
      getNumberOfAll: Int
    }

    # type Mutation {

    # }
  `
};
// type Mutation {
//   changeAnnouncement(
//     _id: ID
//     title: String!
//     publicationDate: String!
//     lastUpdate: String!
//     categories: [String!]
//     content: String!
//   ): AnnouncementChangeResponse
// }
// type AnnouncementChangeResponse {
//   success: Boolean!
//   message: String!
//   updatedAnnouncement: [Announcement]
// }
