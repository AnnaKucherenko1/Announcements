export default {
  definitions: `#graphql
  
    type Announcement {
      _id: String
      title: String!
      publicationDate: String!
      lastUpdate: String!
      categories: [String!]
      content: String!
    }
    type EditAnnouncementResponse {
    success: Boolean
    message: String
    updatedAnnouncement: Announcement
}
  
    type Query {
      getAnnouncement(_id: ID!): Announcement
      getAnnouncementsByPage(page: Int, perPage: Int): [Announcement]
      getNumberOfAll: Int
    }

    type Mutation {
      editAnnouncement(
      _id: String
      updatedAnnouncement: AnnouncementInput
  ): EditAnnouncementResponse
}

    input AnnouncementInput {
      title: String
      publicationDate: String
      lastUpdate: String
      categories: [String]
      content: String
    }
  `,
};
