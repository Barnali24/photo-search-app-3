import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../redux/actions';
import '../../styles/main.css';

const Signup = ({ addUser }) => { // Destructure the addUser prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin');
  const [showNotification, setShowNotification] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the addUser action with the username, email, and password
    addUser(username, email, password, role);
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('Admin');

    // Show the notification
    setShowNotification(true);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className='form-container'>
      {showNotification && <div className="notification">Signed up successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
          required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

// Use mapDispatchToProps to ensure addUser is dispatched as an action
const mapDispatchToProps = (dispatch) => ({
  addUser: (username, email, password,role) => dispatch(addUser(username, email, password,role)),
});

export default connect(null, mapDispatchToProps)(Signup);
