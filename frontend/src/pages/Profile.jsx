import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

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
                if (error.response && error.response.status === 401) {
                    // Redirect to login if unauthorized
                    window.location.href = '/login';
                }
            }
        };
        fetchProfile();
    }, [accessToken]);

    if (!user) return <div className="text-white text-center mt-20">Loading...</div>;

    const handleEditProfile = () => {
        window.location.href = '/profile/edit';
    }
    return (
        <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6">Profile</h2>
                <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <img
                        src={user.profile_picture}
                        alt="Profile"
                        className="w-32 h-32 mb-4 rounded-full border-4 border-gray-700 shadow-lg"
                    />
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-2">{user.name}</h3>
                        <p className="text-gray-400 mb-4">{user.email}</p>
                    </div>
                    <div className="w-full">
                        <div className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p className="mb-2">
                                <strong className="text-gray-400">Role:</strong> {user.role}
                            </p>
                            <p className="mb-2">
                                <strong className="text-gray-400">Bio:</strong> {user.bio}
                            </p>
                            <p className="mb-2">
                                <strong className="text-gray-400">Contact Number:</strong> {user.contact_number}
                            </p>
                            <p className="mb-2">
                                <strong className="text-gray-400">Address:</strong> {user.address}
                            </p>
                            <p className="mb-2">
                                <strong className="text-gray-400">Date Joined:</strong> {user.date_joined}
                            </p>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;