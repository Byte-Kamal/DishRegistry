import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api-auth/profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [accessToken]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Profile</h2>
            <img src={user.profile_picture} alt="Profile" className="w-52 h-52 mb-4 rounded-full" />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Contact Number:</strong> {user.contact_number}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Date Joined:</strong> {user.date_joined}</p>
        </div>
    );
};

export default Profile;
