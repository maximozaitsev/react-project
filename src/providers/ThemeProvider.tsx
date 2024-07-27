import React, { useState, ReactNode } from 'react';
import ThemeContext from '../contexts/ThemeContext';

type Theme = 'light' | 'dark';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
