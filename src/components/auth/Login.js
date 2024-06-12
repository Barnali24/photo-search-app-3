import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions';
import '../../styles/main.css';

const Login = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
   
    loginUser(username, password)
      .then((response) => {
   
        if (response.authenticated) {
      
          navigate('/photo-search');
        } else {
      
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        
        alert(error.message); 
      });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
