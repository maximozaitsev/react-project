// app/layout.tsx
'use client';

import React from 'react';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { ThemeProvider } from '../src/providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
