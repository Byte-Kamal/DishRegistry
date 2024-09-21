import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const bioRef = useRef();
    const contactNumberRef = useRef();
    const addressRef = useRef();
    const profilePictureRef = useRef();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api-auth/profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching profile');
                setLoading(false);
            }
        };
        fetchProfile();
    }, [accessToken]);

    const handleSubmit = async (e, navigateToProfile = false) => {
        e.preventDefault();
        const updatedUser = {
            bio: bioRef.current.value,
            contact_number: contactNumberRef.current.value,
            address: addressRef.current.value,
            profile_picture: profilePictureRef.current.value,
        };
        try {
            await axios.patch('http://localhost:8000/api-auth/profile/', updatedUser, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSuccess(true);
            if (navigateToProfile) {
                navigate('/profile'); // Navigate to the profile page after successful update
            }
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
            setError('Error updating profile');
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

    return (
        <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6">Edit Profile</h2>
                {success && <div className="text-green-500 mb-4">Profile updated successfully!</div>}
                <form onSubmit={(e) => handleSubmit(e, false)} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="role">Role</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={user.role}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            defaultValue={user.bio}
                            ref={bioRef}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="contact_number">Contact Number</label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            defaultValue={user.contact_number}
                            ref={contactNumberRef}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={user.address}
                            ref={addressRef}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="profile_picture">Profile Picture URL</label>
                        <input
                            type="text"
                            id="profile_picture"
                            name="profile_picture"
                            defaultValue={user.profile_picture}
                            ref={profilePictureRef}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Save & Back to Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;