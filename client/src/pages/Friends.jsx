import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Friends = () => {
    const { loading, data } = useQuery(QUERY_PROFILES);
    const profiles = data?.profiles || [];
    console.log(profiles)
    const [addedUser, setAddedUser] = useState({ email: '' });
    const [addFriend, { error, data: friendData }] = useMutation(ADD_FRIEND);;
    const [currentId, setCurrentId] = useState('');

    const friends = []
    function getFriends() {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].friends.includes(currentId)) {
                friends.push(profiles[i])
            }
        }
    }
    function getIdByEmail(email) {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].email === email) {
                console.log(profiles[i]._id)
            }
        }
    }
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setAddedUser({
            ...addedUser,
            [name]: value
        });
    };
    // submit form
    const handleFormSubmit = async (event) => {
        if (Auth.loggedIn) {
            const currentUser = Auth.getProfile();
            setCurrentId(profile.data._id)

            event.preventDefault();
            console.log(addedUser);
            try {
                const friendId = getIdByEmail(addedUser.email);
                const { data } = await addFriend({
                    variables: { friendId },
                });
            } catch (e) {
                console.error(e);
            }
        }

        // clear form values
        setAddedUser('');
    };
    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ProfileList
                            profiles={profiles}
                        />
                    )}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        className="form-input"
                        placeholder="Friends email"
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