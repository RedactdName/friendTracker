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

export const UPDATE_LOCATION = gql`
mutation updateLocation($profileId: ID!, $lat: Float!, $lon: Float!) {
  updateLocation(profileId: $profileId, lat: $lat, lon: $lon) {
    _id
    location {
      lat
      lon
    }
  }
}
`;

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