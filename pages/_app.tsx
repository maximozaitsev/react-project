import React from 'react';
import '../styles/global.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { ThemeProvider } from '../src/providers/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
