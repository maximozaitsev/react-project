import React from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>My Pokemon App</h1>
      <ThemeSelector />
    </header>
  );
};

export default Header;
