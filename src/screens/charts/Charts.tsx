import React, {useState} from 'react';
import {ScrollView, Dimensions, StyleSheet, View} from 'react-native';
import {Appbar, Button, Card, Divider, Text} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';

const screenWidth = Dimensions.get('window').width - 20;

export default function ChartScreen() {
  // Datos ficticios para el gráfico
  const monthlyData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        data: [30, 45, 28, 80, 99, 43],
        strokeWidth: 2, // Ancho de línea
      },
    ],
  };

  const annualData = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        data: [400, 700, 500, 800],
        strokeWidth: 2, // Ancho de línea
      },
    ],
  };

  // Estado para alternar entre gráficos mensuales y anuales
  const [isMonthly, setIsMonthly] = useState(true);

  // Función para alternar entre gráficos mensuales y anuales
  const toggleGraphType = () => {
    setIsMonthly(!isMonthly);
  };

  // Configuración de los gráficos
  const chartConfig = {
    backgroundGradientFrom: '#f5f5f5',
    backgroundGradientTo: '#ffffff',
    color: () => '#6200ee', // Color púrpura de react-native-paper
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#6200ee',
    },
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  return (
    <LayoutContainer style={{margin: 0}}>
      <ScrollViewContainer>
        <Appbar.Header>
          <Appbar.Content
            title={isMonthly ? 'Gráfico Mensual' : 'Gráfico Anual'}
          />
        </Appbar.Header>
        <Text style={styles.text}>
          {isMonthly ? 'Gráfico Mensual' : 'Gráfico Anual'}
        </Text>
        <LineChart
          data={isMonthly ? monthlyData : annualData}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Button
          mode="contained"
          onPress={toggleGraphType}
          style={styles.button}>
          Cambiar a {isMonthly ? 'Gráfico Anual' : 'Gráfico Mensual'}
        </Button>
        <Divider />
        <Card style={styles.card}>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card>
        <Card mode="elevated" style={styles.card}>
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </Card>
        <Card mode="elevated" style={styles.card} elevation={4}>
          <LineChart
            data={data}
            width={screenWidth}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />
        </Card>
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  card: {
    flex: 1,
    // padding: 16,
    // marginBottom: 6,
    margin: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'center',
  },
});
