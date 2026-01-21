import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  const { user, updateProfileFunc, loading, error, clearError } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfileFunc(displayName, photoURL);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      clearError && clearError();
    } catch (err) {
      setMessage("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
    setMessage("");
    clearError && clearError();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="px-6 py-10">
          {/* Avatar */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-emerald-500 object-cover shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {user.displayName || "Your Name"}
          </h2>

          {/* Messages */}
          {message && (
            <div
              className={`p-3 rounded-md mb-4 text-center font-medium ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 text-red-800 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          {/* Profile info */}
          {!isEditing ? (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Email Verified:</span>
                <span
                  className={`font-semibold ${
                    user.emailVerified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Account Created:</span>
                <span className="text-gray-900">
                  {user.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-lg hover:from-teal-500 hover:to-emerald-500 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-lg hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-400 transition-all duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
