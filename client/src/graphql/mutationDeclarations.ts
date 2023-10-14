import { gql } from '@apollo/client';


export const EDIT_ANNOUNCEMENT = gql`
  mutation EditAnnouncement($_id: ID!, $updatedAnnouncement: AnnouncementInput) {
    editAnnouncement(_id: $_id, updatedAnnouncement: $updatedAnnouncement) {
      success
      message
      updatedAnnouncement {
        _id
        title
        publicationDate
        lastUpdate
        categories
      }
    }
  }
`;