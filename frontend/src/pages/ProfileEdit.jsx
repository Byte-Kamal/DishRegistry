import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileEdit = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
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
                setFormData(response.data); // Set initial form data
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [accessToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('http://localhost:8000/api-auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Edit Profile</h2>
            <img src={formData.profile_picture} alt="Profile" className="w-52 h-52 mb-4 rounded-full" />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} readOnly className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="role">Role:</label>
                    <input type="text" id="role" name="role" value={formData.role} readOnly className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="bio">Bio:</label>
                    <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="contact_number">Contact Number:</label>
                    <input type="text" id="contact_number" name="contact_number" value={formData.contact_number} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="profile_picture">Profile Picture URL:</label>
                    <input type="url" id="profile_picture" name="profile_picture" value={formData.profile_picture || ''} onChange={handleChange} className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"/>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
