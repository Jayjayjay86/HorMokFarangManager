// src/storage.js
import {MMKV} from 'react-native-mmkv';

// Initialize MMKV instance
export const storage = new MMKV({
  id: 'hor-mok-storage',
  // encryptionKey: 'your-secure-key-here' // Uncomment for production
});

// Storage helper object with all necessary methods
export const Storage = {
  // Object storage
  setObject: (key, value) => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving object:', error);
    }
  },

  getObject: key => {
    try {
      const json = storage.getString(key);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error('Error parsing object:', error);
      return null;
    }
  },

  // Primitive types
  setString: (key, value) => storage.set(key, value),
  getString: key => storage.getString(key),

  setNumber: (key, value) => storage.set(key, value),
  getNumber: key => storage.getNumber(key),

  setBoolean: (key, value) => storage.set(key, value),
  getBoolean: key => storage.getBoolean(key),

  // Utility methods
  contains: key => storage.contains(key),

  delete: key => storage.delete(key),

  clearAll: () => storage.clearAll(),

  // Array-specific methods
  setArray: (key, array) => {
    try {
      storage.set(key, JSON.stringify(array));
    } catch (error) {
      console.error('Error saving array:', error);
    }
  },

  getArray: key => {
    try {
      const json = storage.getString(key);
      return json ? JSON.parse(json) : [];
    } catch (error) {
      console.error('Error parsing array:', error);
      return [];
    }
  },
};
