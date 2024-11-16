import React, { useState } from 'react';

function ProfilePage({ user, onSignOut, onChangePassword }) {
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    onChangePassword(newPassword);
    setNewPassword('');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <button onClick={onSignOut}>Sign Out</button>
      <div>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>
    </div>
  );
}

export default ProfilePage;
