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

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!, profileId: ID!) {
    addFriend(friendId: $friendId, profileId: $profileId) {
      _id
      name
      friends
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!, profileId: ID!) {
    removeFriend(friendId: $friendId, profileId: $profileId) {
      _id
      name
      friends
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!, profileId: ID!) {
    removeUser(userId: $userId, profileId: $profileId) {
      _id
      name
    }
  }
`;


export const ADD_GROUP = gql`
  mutation addGroup($groupId: ID!) {
    addGroup(groupId: $groupId) {
      _id
      name
      groups
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($groupId: ID!) {
    removeGroup(groupId: $groupId) {
      _id
      name
      groups
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($groupId: ID!, $name: String!) {
    updateGroup(groupId: $groupId, name: $name) {
      _id
      name
    }
  }
`;

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