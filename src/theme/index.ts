export const lightTheme = {
  primary: '#D32F2F',           // vermelho mais escuro (para botões e header)
  background: '#FFEBEE',        // vermelho claro para o fundo
  text: '#212121',
  border: '#FFCDD2',            // borda vermelha clara
  placeholder: '#757575',
  buttonText: '#FFFFFF',
  link: '#C62828',
  card: '#FFEBEE',              // vermelho claro para containers
};

export const darkTheme = {
  primary: '#B71C1C',
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
