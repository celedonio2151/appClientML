/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import UserContext from './src/context/Context';
import useToken from './src/hooks/useToken';
import useProfile from './src/hooks/useProfile';
import usePost from './src/hooks/usePost';
import MyDrawer from './src/components/drawer/MyDrawer';
import SignInScreen from './src/screens/signIn/SignIn';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoadingScreen from './src/screens/loading/Loading';

export default function App(): React.JSX.Element {
  const {token, setToken} = useToken();
  const {userProfile, setProfile} = useProfile();
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const checkToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('userToken');
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedToken && savedProfile) {
        setToken(savedToken);
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error verificando el token:', error);
    } finally {
      setIsLoading(false); // Finaliza la carga independientemente del resultado
    }
  };

  useEffect(() => {
    checkToken(); // Verificar el token al iniciar la app
  }, []);

  const logoutUser = () => {
    usePost(`/auth/logout`, '', token!)
      .then(async response => {
        console.log({response});
        // Limpia el token y el perfil del usuario de AsyncStorage
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userProfile');
        // Actualiza el estado
        setToken(null);
        setProfile(null);
      })
      .catch(async err => {
        console.log(err);
        // Limpia el token y el perfil del usuario de AsyncStorage
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userProfile');
        // Actualiza el estado
        setToken(null);
        setProfile(null);
      })
      .finally(() => {});
  };

  if (isLoading) {
    return <LoadingScreen />; // Mostrar la pantalla de carga mientras verifica el token
  }

  return (
    <UserContext.Provider
      value={{token, setToken, userProfile, setProfile, logout: logoutUser}}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {token || userProfile ? <MyDrawer /> : <SignInScreen />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
