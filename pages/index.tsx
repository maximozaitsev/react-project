// pages/index.tsx
import React from 'react';
import Home from '../src/components/Home';
import Header from '../src/components/Header/Header';
import useTheme from '../src/hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <Home />
    </div>
  );
};

export default HomePage;
