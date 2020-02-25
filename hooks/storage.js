// @flow
/**
 * Credit to https://usehooks.com/useLocalStorage/ for the original hook.
 */

import * as React from "react";

// Hook
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // If no item, set item
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useSessionStorage<T>(key: string) {
  // Check for Next.js SSR
  const client = typeof window !== "undefined";

  const [state, setState] = React.useState<T>(() => {
    try {
      // load any stored data, parse JSON if data
      const cached = window.sessionStorage.getItem(key);
      if (!cached) return null;
      return JSON.parse(cached);
    } catch (err) {
      console.error("Failed loading from sessionStorage");
      return null;
    }
  });

  const setStorage = React.useCallback(
    (value: T) => {
      try {
        // Save it to the session, then save it to the state
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("Failed saving to sessionStorage");
      }
      setState(value);
    },
    [client, setState]
  );

  return [state, setStorage];
}
