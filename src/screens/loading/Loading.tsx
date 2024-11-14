import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import LoadingActivity from '../../components/activity/LoadingActivity';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      {/* Puedes reemplazar esta imagen con el logo de tu aplicación */}
      <Image
        source={require('../../assets/logoF.jpg')} // Tu logo aquí
        style={styles.logo}
      />
      <LoadingActivity size="large" title='Cangando sistema' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fondo claro o el que prefieras
  },
  logo: {
    width: 150, // Ancho de tu logo
    height: 150, // Altura de tu logo
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333', // Color del texto
  },
});
