import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page not found</h1>
      <p style={styles.text}>
        Oops! The page you are looking for does not exist. Click <Link to="/">here</Link> to go back to the homepage.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    color: '#333',
    textAlign: 'center',
    padding: '20px'
  },
  header: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  text: {
    fontSize: '1.2rem'
  }
};

export default NotFound;
