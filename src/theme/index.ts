export const lightTheme = {
  primary: '#D32F2F',
  secondary: '#FF9F1C', 
  background: '#FFEBEE',
  text: '#212121',
  border: '#FFCDD2',
  placeholder: '#757575',
  buttonText: '#FFFFFF',
  link: '#C62828',
  card: '#FFEBEE',
};

export const darkTheme = {
  primary: '#B71C1C',
  secondary: '#FF9F1C', 
  background: '#121212',
  text: '#E0E0E0',
  border: '#444',
  placeholder: '#888',
  buttonText: '#FFFFFF',
  link: '#EF9A9A',
  card: '#1F1F1F',
};

export const theme = lightTheme;

export type Theme = typeof lightTheme;

import { useContext, createContext } from 'react';

const ThemeContext = createContext({ colors: theme });

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);

export const defaultTheme = {
  colors: {
    primary: '#D7263D',
    secondary: '#FF9F1C',
    background: '#FFF',
    text: '#000',
    border: '#ccc',
    placeholder: '#999',
    buttonText: '#FFF',
    link: '#1E90FF',
    card: '#FFF',
  },
};
