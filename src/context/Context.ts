import {createContext} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypeContext} from '../interfaces/Interfaces';

// Función para cerrar sesión
// const logout = async () => {
//   try {
//     // Limpia el token y el perfil del usuario de AsyncStorage
//     await AsyncStorage.removeItem('userToken');
//     await AsyncStorage.removeItem('userProfile');

//     // Actualiza el estado
//     setToken(null);
//     setUserProfile(null);
//   } catch (error) {
//     console.error('Error al cerrar sesión:', error);
//   }
// };

// FOR TOKEN AND PROFILE
export const UserContext = createContext<TypeContext>({
  token: null,
  setToken: () => {},
  userProfile: null,
  setProfile: () => {},
  logout: () => {},
});

export default UserContext;
