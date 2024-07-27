import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundHeader}>404 - Page Not Found</h1>
      <p className={styles.notFoundText}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
