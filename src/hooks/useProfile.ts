import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserProfileInterface} from '../interfaces/Interfaces';

export default function useProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileInterface | null>(
    null,
  );

  const getUserProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      return storedProfile ? JSON.parse(storedProfile) : null;
    } catch (error) {
      console.error('Error obteniendo el perfil del usuario:', error);
      return null;
    }
  };

  const saveProfile = async (profile: UserProfileInterface | null) => {
    try {
      if (profile) {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      } else {
        await AsyncStorage.removeItem('userProfile');
      }
      setUserProfile(profile);
    } catch (error) {
      console.error('Error guardando el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const profile = await getUserProfile();
      setUserProfile(profile);
    };

    loadUserProfile();
  }, []);

  return {userProfile, setProfile: saveProfile};
}
