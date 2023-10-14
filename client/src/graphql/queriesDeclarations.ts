import { gql } from 'graphql-tag';

export const GET_ANNOUNCEMENTS = gql`
query GetAnnouncements($page: Int!, $perPage: Int!) {
    getAnnouncementsByPage(page: $page, perPage: $perPage) {
      _id
      title
      publicationDate
      lastUpdate
      categories
    }
  }
`;
export const GET_NUMBER_OF_ALL = gql`
  query GetNumberOfAll {
    getNumberOfAll
  }
`;
export const GET_ANNOUNCEMENT = gql`
  query GetAnnouncement($_id: ID!) {
    getAnnouncement(_id: $_id) {
      content
    }
  }
`;