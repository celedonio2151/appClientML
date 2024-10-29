import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface userDetails {
  fullname: string;
  ci: number;
  meterNumber: number;
}

export default function UserDetails(user: userDetails): React.JSX.Element {
  const {fullname, ci, meterNumber} = user;
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.styleTextFirst}>Nombre: </Text>
        <Text style={styles.styleTextSecond}>{fullname}</Text>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.styleTextFirst}>Carnet Idendidad:</Text>
        <Text style={styles.styleTextSecond}>{ci}</Text>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.styleTextFirst}>Nro. medidor:</Text>
        <Text style={styles.styleTextSecond}>{meterNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // height: 50,
    // backgroundColor: 'green',
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    paddingTop: 5,
    paddingBottom: 5,
  },
  styleTextFirst: {
    // backgroundColor: 'black',
    width: '35%',
    fontSize: 18,
    textAlignVertical: 'center',
    color: 'black',
  },
  styleTextSecond: {
    // backgroundColor: 'black',
    color: 'black',
    width: '60%',
    // textAlign: 'right',
    fontSize: 18,
    textAlignVertical: 'center',
  },
});
