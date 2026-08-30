import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './i18n';
import App from './App.jsx';

const theme = createTheme({
  fontFamily: 'Inter, Noto Sans JP, Noto Sans SC, sans-serif',
  headings: { fontFamily: 'Outfit, Inter, sans-serif' },
  primaryColor: 'violet',
  defaultRadius: 'md',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
);
