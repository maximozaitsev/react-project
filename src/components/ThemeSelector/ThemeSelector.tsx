import React from 'react';
import useTheme from '../../hooks/useTheme';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value as 'light' | 'dark');
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={handleChange}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={handleChange}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeSelector;
