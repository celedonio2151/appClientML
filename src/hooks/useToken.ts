import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useToken() {
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken ? userToken : null; // Elimina JSON.parse
    } catch (error) {
      console.error('Error obteniendo el token:', error);
      return null;
    }
  };

  const saveToken = async (userToken: string | null) => {
    try {
      if (userToken) {
        await AsyncStorage.setItem('userToken', userToken); // Elimina JSON.stringify
      } else {
        await AsyncStorage.removeItem('userToken');
      }
      setToken(userToken);
    } catch (error) {
      console.error('Error guardando el token:', error);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    loadToken();
  }, []);

  return {token, setToken: saveToken};
}
