import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import HomeScreen from '../../screens/home/HomeScreen';
import ReaderScreen from '../../screens/reader/ReaderScreen';
import ReadingFormScreen from '../../screens/readingForm/ReadingForm';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import {formatDate} from '../../helpers/formatDate';
import {STACK_SCREENS} from '../../config/screenNames';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();

  const navigate = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#0163d2'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <Stack.Screen
        name={STACK_SCREENS.HOME.path}
        component={HomeScreen}
        options={{
          title: `${STACK_SCREENS.HOME.label}`,
          headerLeft: () => (
            <MaterialIcon
              name="menu"
              color="white"
              size={28}
              onPress={navigate}
            />
          ),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.READER.path}
        component={ReaderScreen}
        options={({route}) => ({
          title: `${STACK_SCREENS.READER.label} ${formatDate(
            new Date(),
            'MMMM',
          )}`,
        })}
      />
      <Stack.Screen
        name={STACK_SCREENS.READING_FORM.path}
        component={ReadingFormScreen}
        options={{title: `${STACK_SCREENS.READING_FORM.label}`}}
      />
      <Stack.Screen
        name="DetailsStack"
        component={DetailsScreen}
        options={{title: 'Details'}}
      />
    </Stack.Navigator>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>HomeStack</Text>
    </View>
  );
}
