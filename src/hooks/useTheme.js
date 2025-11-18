import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing dark/light theme
 * Detects system preference and persists user choice
 * @returns {Object} { theme, toggleTheme, isDark }
 */
export const useTheme = () => {
  // Get system preference
  const getSystemTheme = () => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Initialize with system preference or stored value
  const [theme, setTheme] = useLocalStorage('theme', getSystemTheme());

  useEffect(() => {
    // Apply theme to document root
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
};
