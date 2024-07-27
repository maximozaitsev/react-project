import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store/store';
import { ThemeProvider } from './providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
