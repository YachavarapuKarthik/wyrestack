import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // For reading cookies

const ProfileDashboard: React.FC = () => {
  const userEmail = Cookies.get('userEmail'); // Get email from cookies
  const [user, setUser] = useState({
    email: '',
    name: '',
    dob: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshProfile, setRefreshProfile] = useState(false); // New state to trigger re-fetch

  // Fetch user profile on load or when refreshProfile changes
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userEmail}`);
        console.log('Fetched user data:', response.data); // Log the fetched user data
        setUser(response.data); // Populate user data
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Failed to fetch user data');
      }
    };

    if (userEmail) {
      fetchProfile();
    }
  }, [userEmail, refreshProfile]); // Re-fetch when refreshProfile state changes

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = {
        name: user.name,
        dob: user.dob,
        phone: user.phone,
      };

      console.log('Updating user data:', updatedData); // Log the updated data

      const response = await axios.put(`http://localhost:5000/auth/profile/${userEmail}`, updatedData);
      console.log('Updated user data:', response.data); // Log the updated response

      // Ensure the user data is updated with the response from the backend
      setUser(response.data.user);  // Update state with new user data
      alert(response.data.message);  // Display success message
      setIsEditing(false);  // Exit edit mode

      // Trigger the profile re-fetch
      setRefreshProfile((prev) => !prev); // Toggle to trigger the useEffect again
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="profile-dashboard">
      <h2>User Profile</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {!isEditing ? (
        <div>
          <p><strong>Email:</strong> {userEmail}</p> {/* Email is not editable */}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProfileDashboard;
