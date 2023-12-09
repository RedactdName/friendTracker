import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// export const ADD_SKILL = gql`
//   mutation addSkill($profileId: ID!, $skill: String!) {
//     addSkill(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// export const REMOVE_SKILL = gql`
//   mutation removeSkill($skill: String!) {
//     removeSkill(skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;
// ________________________________________________ added by LE
// export const ADD_USER = gql`
//   mutation addUser($name: String!, $email: String!, $password: String!, $username: String!) {
//     addUser(name: $name, email: $email, password: $password, username: $username) {
//       token
//       profile {
//         _id
//         name
//       }
//     }
//   }
// `;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      name
      friends
    }
  }
`;

// export const REMOVE_FRIEND = gql`
//   mutation removeFriend($friendId: ID!) {
//     removeFriend(friendId: $friendId) {
//       _id
//       name
//       friends
//     }
//   }
// `;

// export const REMOVE_USER = gql`
//   mutation removeUser($userId: ID!) {
//     removeUser(userId: $userId) {
//       _id
//       name
//     }
//   }
// `;


// export const ADD_GROUP = gql`
//   mutation addGroup($groupId: ID!) {
//     addGroup(groupId: $groupId) {
//       _id
//       name
//       groups
//     }
//   }
// `;

// export const REMOVE_GROUP = gql`
//   mutation removeGroup($groupId: ID!) {
//     removeGroup(groupId: $groupId) {
//       _id
//       name
//       groups
//     }
//   }
// `;

// export const UPDATE_GROUP = gql`
//   mutation updateGroup($groupId: ID!, $name: String!) {
//     updateGroup(groupId: $groupId, name: $name) {
//       _id
//       name
//     }
//   }
// `;

// export const UPDATE_LOCATION = gql`
//   mutation updateLocation($lat: Float!, $lon: Float!) {
//     updateLocation(lat: $lat, lon: $lon) {
//       _id
//       name
//       location {
//         lat
//         lon
//       }
//     }
//   }
// `;

// export const UPDATE_USER = gql`
//   mutation updateUser($name: String!, $email: String!, $password: String!) {
//     updateUser(name: $name, email: $email, password: $password) {
//       _id
//       name
//     }
//   }
// `;

// export const UPDATE_USERNAME = gql`
//   mutation updateUsername($username: String!) {
//     updateUsername(username: $username) {
//       _id
//       name
//       username
//     }
//   }
// `;