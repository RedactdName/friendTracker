import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
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
    }
  }
`;
// ________________________________________________ added by LE 
// export const QUERY_FRIENDS = gql`
//   query getFriends {
//     getFriends {
//       _id
//       username
//       location {
//         lat
//         lon
//       }
//     }
//   }
// `;
// export const QUERY_LOCATION = gql`
//   query getLocation {
//     getLocation {
//       lat
//       lon
//     }
//   }
// `;