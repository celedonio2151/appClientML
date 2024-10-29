import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import StackNavigator from '../Stack/StackNavigator';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: {backgroundColor: '#0163d2'},
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Inicio" component={StackNavigator} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}
const Article = () => (
  <View>
    <Text>Hola desde Article</Text>
  </View>
);
