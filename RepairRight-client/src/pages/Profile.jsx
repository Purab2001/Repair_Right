import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageHelmet from '../components/PageHelmet';
import { FiImage, FiSave, FiUser } from 'react-icons/fi';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            await updateProfile({ displayName: name, photoURL });
            setSuccess('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setError(`Failed to update profile: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex px-4 items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden min-h-[calc(100vh-80px)]">
            <PageHelmet title="Profile" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 space-y-6 relative z-10"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                        Profile
                    </h2>
                    <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-3" />
                    <p className="text-slate-300 text-sm">Update your profile information below</p>
                </div>
                {error && (
                    <div className="alert bg-red-500/20 border border-red-500/30 text-red-300 py-3 px-4 rounded-lg backdrop-blur-sm mb-2">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}
                {success && (
                    <div className="alert bg-green-500/20 border border-green-500/30 text-green-300 py-3 px-4 rounded-lg backdrop-blur-sm mb-2">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {success}
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={photoURL || '/user.png'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                    />
                    <label className="w-full">
                        <span className="block mb-1 font-medium text-slate-200">Profile Image URL</span>
                        <div className="relative">
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 bg-white/60 text-base-content"
                                value={photoURL}
                                onChange={e => setPhotoURL(e.target.value)}
                                placeholder="Image URL"
                            />
                            <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
                        </div>
                    </label>
                </div>
                <label className="block">
                    <span className="block mb-1 font-medium text-slate-200">Name</span>
                    <div className="relative">
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10 bg-white/60 text-base-content"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
                    </div>
                </label>
                <button
                    type="submit"
                    className="btn btn-primary shadow-none w-full flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default Profile;
