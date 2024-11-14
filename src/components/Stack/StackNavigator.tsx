import React from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appbar, Avatar, Text, useTheme} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BootomNavigator from '../bottomNavigator/BottomNavigator';
import ReaderScreen from '../../screens/reader/ReaderScreen';
import ReadingFormScreen from '../../screens/readingForm/ReadingForm';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        // statusBarColor: 'blue',
        headerStyle: {backgroundColor: '#0163d2'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerShown: true,
        // headerLeft: () => {
        //   return (
        //     <MaterialCommunityIcons
        //       name="menu"
        //       color="white"
        //       size={28}
        //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        //     />
        //   );
        // },
      }}>
      <Stack.Screen
        name="Main"
        component={BootomNavigator}
        options={{
          // headerTitle: 'Feedi',
          headerLeft: () => {
            return (
              <MaterialCommunityIcons
                name="menu"
                color="white"
                size={28}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerTitle: 'Details'}}
      />
      <Stack.Screen name="Reader" component={ReaderScreen} />
      <Stack.Screen name="ReadingForm" component={ReadingFormScreen} />
    </Stack.Navigator>
  );
}

function Details() {
  return (
    <View>
      <Text>Hola desde Details</Text>
    </View>
  );
}
