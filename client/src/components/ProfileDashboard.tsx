import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

const ProfileDashboard: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error: any) {
        setErrorMessage('Failed to fetch user data');
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:4000/profile', user, { withCredentials: true });
      alert(response.data.message);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage('Failed to update profile');
    }
  };

  return (
    <div className="profile-dashboard">
      <h2>User Profile</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={user.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProfileDashboard;
