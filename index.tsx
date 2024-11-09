/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {DefaultTheme, PaperProvider, useTheme} from 'react-native-paper';
import {es, registerTranslation} from 'react-native-paper-dates';
registerTranslation('es', es);

import App from './App';
import {name as appName} from './app.json';

const theme = {
  // roundness: 2,
  darkGray: '#607D8B', // Gris Oscuro selecionado
  blueC: '#00BCD4', // Azul mejorado
  whiteC: '#FFFFFF', // Blanco selecionado
  blackC: '#000000', // Negro selecionado
  backgroundCustom: '#FFFFFF', // Blanco selecionado
  colors: {
    ...DefaultTheme,
    ...DefaultTheme.colors,
    primary: '#009A2B', // Verde selecionado
    secondary: '#D9D9D9', // Gris selecionado
    tertiary: '#FF4D00', // Naranja selecionado
    quaternary: '#FF0000', // Rojo selecionado
    quinary: '#9932cc', // Púrpura oscuro
    darkGray: '#607D8B', // Gris Oscuro selecionado
    whiteC: '#FFFFFF', // Blanco selecionado
    blackC: '#000000', // Negro selecionado
    textColor: '#000000', // Color del texto
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
