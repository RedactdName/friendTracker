const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profilesByIds: async (parent, { profileIds }) => {
      console.log("Received profile IDs: ", profileIds);
      try {
        const profiles = await Profile.find({
          '_id': { $in: profileIds }
        });
        console.log("Found profiles: ", profiles);
        return profiles;
      } catch (error) {
        console.error("Error in profilesByIds resolver: ", error);
        throw new Error("Error fetching profiles");
      }
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addSkill: async (parent, { profileId, skill }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a skill from their own profile
    // removeSkill: async (parent, { skill }, context) => {
    //   if (context.user) {
    //     return Profile.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { skills: skill } },
    //       { new: true }
    //     );
    //   }
    //   throw AuthenticationError;
    // },
    //This is where cody started messing with stuff

    addFriend: async (parent, { profileId, friendId }, context) => {
      console.log(context.user)
      if (context.user) {
        const updatedProfile = await Profile.findByIdAndUpdate(
          profileId,
          { $addToSet: { friends: friendId } },
          { new: true, runValidators: true }
        );
        if (!updatedProfile) {
          throw new Error('Error adding friend');
        }
        const token = signToken(updatedProfile);
        return { token, profile: updatedProfile };
      }
      throw AuthenticationError;
    },
    removeFriend: async (parent, { profileId, friendId }, context) => {
      if (context.user) {
        return await Profile.findByIdAndUpdate(
          profileId,
          { $pull: { friends: friendId } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateLocation: async (parent, { profileId, lat, lon }, context) => {
      if (context.user) {
        return await Profile.findByIdAndUpdate(
          profileId,
          { $set: { location: { lat, lon } } },
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },
    
  },
};

module.exports = resolvers;
