import { Button, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import '../css/style.css';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your authentication logic
    console.log('Submitted:', { username, password });
    // Reset the form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <div className='box'>
        <form onSubmit={handleSubmit}>
            <div className='user'>
            <label htmlFor="username">Username:</label>
              <OutlinedInput
                  type="text"
                  id="username"
                  className='MuiOutlinedInput-input'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  size="small"
              />
              <div className='login-icon'><MailIcon fontSize="large" /></div>
                 
            </div>
            <div className='pass'>
            <label htmlFor="password">Password:</label>
            <OutlinedInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="small"
            />
            <div className='login-icon'><LockIcon fontSize="large" /></div>
            </div>
            <button type="submit" variant="contained" className='btn'>LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
