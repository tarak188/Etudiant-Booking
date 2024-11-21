import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User logged in successfully!', user);
      
      // Extract the user's name (or email if name is not available)
      const userName = user.displayName || user.email.split('@')[0];
      
      navigate('/home', { state: {    userName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL } });
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };
  return (
    <div>

    <div className="login-container">
      
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        
        {error && <p className="error">{error}</p>} {/* Display error message */}
        
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </fieldset>

        <button type="submit">Login</button>
        <Link to="/signup">Go to Register</Link>
        </form>
    </div></div>
  );
};

export default Login;
