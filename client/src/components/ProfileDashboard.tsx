import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // For reading cookies

const ProfileDashboard: React.FC = () => {
  const userEmail = Cookies.get('userEmail'); // Get email from cookies
  const userId = Cookies.get('userId'); // Assuming the user ID is stored in cookies
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    dob: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setErrorMessage('User ID not found');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
        setUser(response.data); // Populate user data
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Failed to fetch user data');
      }
    };

    fetchProfile();
  }, [userId]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage('User ID not found');
      return;
    }

    try {
      const updatedData: any = {
        name: user.name,
        dob: user.dob,
        phone: user.phone,
      };

      // Only include password if the user has entered it
      if (user.password) {
        updatedData.password = user.password;
      }

      const response = await axios.put(`http://localhost:5000/auth/profile/${userId}`, updatedData);
      alert(response.data.message);
      setIsEditing(false);
      setUser(response.data.user); // Update state with new user data
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

          <div className="form-group">
            <label>New Password (optional):</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter new password"
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
