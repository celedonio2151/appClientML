import {DrawerActions, useNavigation} from '@react-navigation/native';
import PaymentsScreen from '../../screens/payments/Payments';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

const Stack = createNativeStackNavigator();
export default function PaymentStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PaymentStack"
        component={PaymentsScreen}
        options={{
          title: 'Lecturas y Saldos',
          // statusBarColor: 'black',
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
