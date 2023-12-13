// const typeDefs = `
//   type Profile {
//     _id: ID
//     name: String
//     email: String
//     password: String
//     skills: [String]!
//   }

//   type Auth {
//     token: ID!
//     profile: Profile
//   }

//   type Query {
//     profiles: [Profile]!
//     profile(profileId: ID!): Profile
//     # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
//     me: Profile
//   }

//   type Mutation {
//     addProfile(name: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth

//     addSkill(profileId: ID!, skill: String!): Profile
//     removeProfile: Profile
//     removeSkill(skill: String!): Profile
//   }
// `;

// module.exports = typeDefs;

const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    friends: [ID] # Array of Profile IDs
    location: Location # Location type for lat and lon
    skills: [String]!
  }

  type Location {
    lat: Float
    lon: Float
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    profilesByIds(profileIds: [ID!]!): [Profile]
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
    addFriend(profileId: ID!, friendId: ID!): Profile
    removeFriend(profileId: ID!, friendId: ID!): Profile
    updateLocation(profileId: ID!, lat: Float!, lon: Float!): Profile
  }
`;

module.exports = typeDefs;