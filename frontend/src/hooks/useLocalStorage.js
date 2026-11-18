import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage may be unavailable or full; keep the in-memory state.
    }
  }, [key, storedValue]);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key !== key && event.key !== null) return;
      try {
        setStoredValue(
          event.key === null || event.newValue === null
            ? initialValue
            : JSON.parse(event.newValue)
        );
      } catch {
        setStoredValue(initialValue);
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setStoredValue];
}
