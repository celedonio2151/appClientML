import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserProfileScreen from '../../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          title: 'Mi Cuenta',
        }}
      />
    </Stack.Navigator>
  );
}
