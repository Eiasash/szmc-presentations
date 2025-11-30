import { useState, useCallback, useEffect } from 'react';

/**
 * Check if the Spark runtime is available and functional
 */
export function isSparkAvailable(): boolean {
  try {
    // Check if spark object exists and has the required methods
    if (typeof window !== 'undefined' && 'spark' in window) {
      const sparkObj = (window as unknown as { spark?: { llm?: unknown; kv?: unknown } }).spark;
      return !!(sparkObj?.llm && sparkObj?.kv);
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * A localStorage-based storage hook that mimics the useKV API
 * This serves as a fallback when GitHub Spark is not available
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T | undefined, (updater: T | ((prev: T | undefined) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((updater: T | ((prev: T | undefined) => T)) => {
    setStoredValue((prev) => {
      const newValue = typeof updater === 'function' 
        ? (updater as (prev: T | undefined) => T)(prev) 
        : updater;
      
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
      
      return newValue;
    });
  }, [key]);

  // Sync with localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
