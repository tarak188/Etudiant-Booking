import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from './firebase'; // Import auth and storage objects
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import './Register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerif, setPasswordVerif] = useState('');
  const [name, setName] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordVerif) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    setErrorMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const registeredUser = userCredential.user;

      let photoURL = null;

      if (picture) {
        const storageRef = ref(storage, `profilePictures/${registeredUser.uid}`);
        await uploadBytes(storageRef, picture);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(registeredUser, {
        displayName: name,
        photoURL: photoURL || null,
      });

      console.log("User Registered successfully!", registeredUser);
      navigate('/Login');
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='register'>
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <h1>Sign Up</h1>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="user_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="passwordVerif">Verify Password:</label>
          <input
            type="password"
            id="passwordVerif"
            name="user_password_verif"
            value={passwordVerif}
            onChange={(e) => setPasswordVerif(e.target.value)}
            required
          />

          <label htmlFor="picture">Profile Picture:</label>
          <input
            type="file"
            id="picture"
            name="user_picture"
            onChange={(e) => setPicture(e.target.files[0])}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p className="sign-in-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
