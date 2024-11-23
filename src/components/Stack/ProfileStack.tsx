import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import UserProfileScreen from '../../screens/profile/ProfileScreen';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={UserProfileScreen}
        options={{
          title: 'Mi Cuenta',
          headerStyle: {backgroundColor: '#0163d2'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () => {
            return (
              <MaterialIcon
                name="menu"
                color="white"
                size={28}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
