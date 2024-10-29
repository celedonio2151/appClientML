import {View, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {Text} from 'react-native-paper';
import LayoutContainer from '../../layouts/LayoutContainer';
import SignInReader from '../signInReader/signInReader';
import Table from '../../components/dataTable/Table';
import {formatDate} from '../../helpers/formatDate';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import useFetch from '../../hooks/useFetch';
import UserContext from '../../context/Context';
import LoadingActivity from '../../components/activity/LoadingActivity';

export default function ReaderScreen(props: any) {
  const {token} = useContext(UserContext);
  const [status, setStatus] = useState('checked');
  const [loginIn, setLoginIn] = useState(true);
  const [meters, loadignMeters, errorMeters, handleCancel] = useFetch(
    `/meter?status=true`,
    token,
  );

  // console.log({meters}, loadignMeters, errorMeters);
  // console.log(meters);

  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };

  const handleEdit = item => {
    // Lógica para editar la fila seleccionada
    // console.log('Edit item:', item);
    props.navigation.navigate('ReadingForm', {...item});
  };

  const columns = [
    {key: '_id', label: 'ID'},
    {key: 'fullname', label: 'Name'},
    {key: 'ci', label: 'CI'},
    {key: 'meterNumber', label: 'Medidor'},
    {key: 'status', label: 'Estado'},
    // Define más columnas según sea necesario
  ];

  return (
    <LayoutContainer>
      <ScrollViewContainer>
        {loginIn ? (
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
                textAlign: 'center',
              }}>
              Lecturar consumo de agua mes {formatDate(new Date(), 'MMMM')}
            </Text>
            {meters && !loadignMeters ? (
              <Table columns={columns} data={meters} onEdit={handleEdit} />
            ) : (
              <LoadingActivity title="Cargando usuarios ..." />
            )}
          </View>
        ) : (
          <SignInReader setLogin={setLoginIn} />
        )}
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'red',
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1, // Establece el contenido del ScrollView para que crezca según sea necesario
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
