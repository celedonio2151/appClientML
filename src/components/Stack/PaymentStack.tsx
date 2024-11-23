import PaymentsScreen from '../../screens/payments/Payments';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payment"
        component={PaymentsScreen}
        options={{
          title: 'Lecturas y Saldos',
        }}
      />
    </Stack.Navigator>
  );
}
