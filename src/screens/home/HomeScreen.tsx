import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ScrollViewBase,
  ScrollViewComponent,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';

export default function HomeScreen() {
  return (
    <ScrollViewContainer>
      <LayoutContainer>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido a Mosoj Llajta</Text>
          <Text style={styles.subtitle}>
            Cuidado y consumo responsable del agua
          </Text>
        </View>

        {/* Tarjeta de consumo de agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Consumo de agua</Title>
            <Paragraph>Controla y monitorea tu consumo de agua.</Paragraph>
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/id/16/200/300'}} /> */}
          <Card.Cover
            source={{
              uri: 'https://media.istockphoto.com/id/1287068401/es/foto/agua-del-grifo-y-una-alcanc%C3%ADa-de-pie-junto-a-ella-concepto-de-precio-de-consumo-de-agua.jpg?s=612x612&w=0&k=20&c=IlpJhYjkoKkQOZ5yfJqthsmSQD_V_Ido92ykhACp5Wg=',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de cuidado del agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Cuidado del agua</Title>
            <Paragraph>Aprende cómo cuidar el recurso más preciado.</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://lapatria.bo/wp-content/uploads/2022/03/istockphoto-1167498174-612x612-1.jpg',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de contaminación del agua */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Contaminación del agua</Title>
            <Paragraph>
              Conoce los riesgos y cómo evitar la contaminación.
            </Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2022/10/16/agua_uru_uru.jpg?itok=5OCWfat3',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        {/* Tarjeta de pagos por consumo */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Pagos por consumo</Title>
            <Paragraph>
              Paga y revisa tu historial de consumos de forma fácil.
            </Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://www.diarioelzondasj.com.ar/content/bucket/8/294378w790h445c.jpg.webp',
            }}
          />
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => {
                /* Manejar navegación */
              }}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>
      </LayoutContainer>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007ACC',
  },
  subtitle: {
    fontSize: 16,
    color: '#007ACC',
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
  },
});
