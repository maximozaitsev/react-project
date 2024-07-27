import React from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <h1>My Pokemon App</h1>
      <ThemeSelector />
    </header>
  );
};

export default Header;
