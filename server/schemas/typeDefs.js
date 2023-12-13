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
    addGroup(profileId: ID!, friendId: ID!): Profile
    removeProfile: Profile
    addFriend(profileId: ID!, friendId: ID!): Profile
    removeFriend(profileId: ID!, friendId: ID!): Profile
    updateLocation(profileId: ID!, lat: Float!, lon: Float!): Profile
  }
`;

module.exports = typeDefs;