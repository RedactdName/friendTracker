import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import { ADD_GROUP } from '../utils/mutations';
import Auth from '../utils/auth';

const Friends = () => {
    const { loading, data } = useQuery(QUERY_PROFILES);
    const profiles = data?.profiles || [];
    console.log(profiles)
    const [addedUser, setAddedUser] = useState({ email: '' });
    const [addGroup, { error, data: groupData }] = useMutation(ADD_GROUP);
    const [currentId, setCurrentId] = useState('');

    function getFriends() {
        const friendsList = [];
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].friends.includes(currentId)) {
                friendsList.push(profiles[i]);
            }
        }
        console.log(friendsList)
        return friendsList;
    }

    function getIdByEmail(email) {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].email === email) {
                return profiles[i]._id;
            }
        }
        return null; 
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAddedUser({
            ...addedUser,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (Auth.loggedIn()) {
            const profile = Auth.getProfile();
            setCurrentId(profile.data._id)
            console.log(addedUser);
            try {
                const friendId = getIdByEmail(addedUser.email);
                console.log(friendId)
                if (friendId) {
                    await addGroup({
                      variables: { 
                                profileId: profile.data._id,
                                friendId: friendId
                            },
                    });
                    alert('Friend added!')
                } else {
                    alert('Email not found');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('You must be logged in to add a friend.');
        }
    
        setAddedUser({ email: '' });
    };
    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ProfileList profiles={profiles} />
                    )}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        className="form-input"
                        placeholder="Friend's email"
                        name="email"
                        type="email"
                        value={addedUser.email}
                        onChange={handleChange}
                    />
                    <button
                        className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Friends;