import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChartScreen from '../../screens/charts/Charts';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

const Stack = createNativeStackNavigator();
export default function ChartStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChartsStack"
        component={ChartScreen}
        options={{
          title: 'Graficas de consumo',
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
