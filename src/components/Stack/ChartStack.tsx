import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChartScreen from '../../screens/charts/Charts';

const Stack = createNativeStackNavigator();
export default function ChartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Charts"
        component={ChartScreen}
        options={{
          title: 'Graficas de consumo',
        }}
      />
    </Stack.Navigator>
  );
}
