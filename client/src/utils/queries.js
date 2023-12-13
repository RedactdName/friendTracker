import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      email
      friends
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      friends
      location {
        lat
        lon
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      location {
        lat
        lon
      }
      friends
    }
  }
`;
export const QUERY_MULTIPLE_PROFILES = gql`
  query QueryMultipleProfiles($profileIds: [ID!]!) {
    profilesByIds(profileIds: $profileIds) {
      _id
      name
      location {
        lat
        lon
      }
    }
  }
`;
// ________________________________________________ added by LE 
export const QUERY_FRIENDS = gql`
  query getFriends {
    getFriends {
      _id
      username
      location {
        lat
        lon
      }
    }
  }
`;
// export const QUERY_LOCATION = gql`
//   query getLocation {
//     getLocation {
//       lat
//       lon
//     }
//   }
// `;