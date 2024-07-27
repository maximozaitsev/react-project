import React from 'react';
import { render, screen } from '@testing-library/react';
import useTheme from '../hooks/useTheme';
import ThemeContext, { ThemeContextProps } from '../contexts/ThemeContext';

// Wrapper component to provide theme context
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const contextValue: ThemeContextProps = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Test component that uses the hook
const TestComponent = () => {
  const { theme } = useTheme();
  return <div>{theme}</div>;
};

// ErrorBoundary component for capturing errors
type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <div>{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// Test cases for useTheme hook
describe('useTheme', () => {
  it('should return theme context value', () => {
    render(
      <ThemeProviderWrapper>
        <TestComponent />
      </ThemeProviderWrapper>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should throw an error when used outside of ThemeProvider', () => {
    // Mock console.error to prevent error output during test
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('useTheme must be used within a ThemeProvider')
    ).toBeInTheDocument();

    // Restore console.error
    consoleError.mockRestore();
  });
});
