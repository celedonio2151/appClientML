import {View} from 'react-native';
import React from 'react';

// import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FundationIcons from 'react-native-vector-icons/Foundation';
import {useIsFocused} from '@react-navigation/native';
import {Button, FAB, Portal, Text} from 'react-native-paper';

// My components Screen
import UserProfileScreen from '../../screens/profile/ProfileScreen';
import HomeScreen from '../../screens/home/HomeScreen';
// import PDFView from '../../screens/invoice/PDFView';
import ChartScreen from '../../screens/charts/Charts';
import PaymentsScreen from '../../screens/payments/Payments';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // no error
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DownloadPDF from '../../screens/downloadPDF/DownloadPDF';
import SegunaOpcionPDF from '../../screens/downloadPDF/SeundaOpcionPDF';
import HomeStack from '../Stack/HomeStack';
import PaymentStack from '../Stack/PaymentStack';
import ChartStack from '../Stack/ChartStack';
import ProfileStack from '../Stack/ProfileStack';
import {TAB_SCREENS} from '../../config/screenNames';

const Tab = createMaterialBottomTabNavigator();

export default function BootomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={TAB_SCREENS.HOME.path}
      // activeColor="#e91e63"
      activeColor="green"
      barStyle={{backgroundColor: 'black'}}>
      <Tab.Screen
        name={TAB_SCREENS.HOME.path}
        component={HomeStack}
        options={{
          // tabBarLabel: 'Inicio',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_SCREENS.PAYMENT.path}
        component={PaymentStack}
        // component={TestScreen}
        options={{
          tabBarLabel: 'Pagar',
          tabBarIcon: ({color}) => (
            <FundationIcons name="dollar-bill" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_SCREENS.CHART.path}
        component={ChartStack}
        options={{
          tabBarLabel: 'Gráficas',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_SCREENS.ACCOUNT.path}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Mi perfíl',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        // component={PDFView}
        component={DownloadPDF}
        // component={SegunaOpcionPDF}
        options={{
          title: 'PDF',
          tabBarLabel: 'Mi recibo',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TestScreen() {
  return (
    <View>
      <Text>Hola desde la pantalla de test screen</Text>
    </View>
  );
}
