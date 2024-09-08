import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some_encryption_key'
})

export const mmkvStorage = {
    setItem: (key: string, value: string) => {
      console.log('MMKV SetItem:', key, value);
      storage.set(key, value);
    },
    getItem: (key: string) => {
      const value = storage.getString(key);
      console.log('MMKV GetItem:', key, value);
      return value ? value : null;
    },
    removeItem: (key: string) => {
      console.log('MMKV RemoveItem:', key);
      storage.delete(key);
    }
  };