import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
