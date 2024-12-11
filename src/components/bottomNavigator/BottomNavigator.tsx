import {View} from 'react-native';
import React from 'react';

import FundationIcons from 'react-native-vector-icons/Foundation';
import {useIsFocused} from '@react-navigation/native';

// My components Screen
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // no error
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DownloadPDF from '../../screens/downloadPDF/DownloadPDF';
import SegunaOpcionPDF from '../../screens/downloadPDF/SeundaOpcionPDF';
import HomeStack from '../Stack/HomeStack';
import PaymentStack from '../Stack/PaymentStack';
import ChartStack from '../Stack/ChartStack';
import ProfileStack from '../Stack/ProfileStack';
import {TAB_SCREENS} from '../../config/screenNames';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

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
            <MaterialIcon name="home" color={color} size={26} />
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
            <MaterialIcon name="chart-areaspline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TAB_SCREENS.ACCOUNT.path}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Mi perfíl',
          tabBarIcon: ({color}) => (
            <MaterialIcon name="account" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="SignIn"
        // component={PDFView}
        component={DownloadPDF}
        // component={SegunaOpcionPDF}
        options={{
          title: 'PDF',
          tabBarLabel: 'Mi recibo',
          tabBarIcon: ({color}) => (
            <MaterialIcon name="book" color={color} size={26} />
          ),
        }}
      /> */}
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
