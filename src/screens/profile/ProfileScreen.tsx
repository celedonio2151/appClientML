import React, {useContext, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';

import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  IconButton,
  MD2Colors,
  Text,
} from 'react-native-paper';
import {RefreshControl} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ICONS
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// My components
import LayoutContainer from '../../layouts/LayoutContainer';
import UserContext from '../../context/Context';
import useFetch from '../../hooks/useFetch';
import UserDetails from './components/UserDetails';
import LoadingActivity from '../../components/activity/LoadingActivity';
import EditMeForm from './components/EditMeForm';

export default function UserProfileScreen({
  profilePicture = 'https://source.unsplash.com/random/800x600/?river,park',
}) {
  const {token, logout} = useContext(UserContext);
  const [isRefreshing, setRefresing] = useState(false);
  const [eventTrigger, setEventTrigger] = useState<Date>(new Date());
  const [formEdit, setFormEdit] = useState<boolean>(false); // Show or hidden from editing
  const {top} = useSafeAreaInsets();
  // const postRequest = usePost(`/me`, token);
  const [data, loading, error, isCanceled] = useFetch(
    `/user/me`,
    token,
    eventTrigger,
  );

  console.log(data, loading, error);

  // Función de ejemplo para manejar el cierre de sesión (reemplazar con tu lógica)
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    logout(); // Cierra session y borra el token
  };

  const onRefresh = () => {
    console.log('Refresing...', loading);
    setEventTrigger(new Date());

    setTimeout(() => {}, 3000);
    loading ? setRefresing(true) : setRefresing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          progressViewOffset={top}
          colors={['red', 'orange', 'green']}
          onRefresh={onRefresh}
        />
      }>
      <LayoutContainer>
        <View style={styles.container}>
          <Card mode="elevated" style={styles.firstCardContainer}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={
                  // uri: 'https://source.unsplash.com/collection/240395/800x600',
                  require('../../assets/logoF.jpg')
                } // URL del logo (reemplazar)
                style={styles.logoImage}
              />
            </View>
            <View>
              <Text style={styles.firstCardText}>
                Comite de Agua Potable Mosoj Llajta
              </Text>
            </View>
          </Card>
          <Card mode="elevated" style={styles.secondCardContainer}>
            <Card
              mode="elevated"
              elevation={3}
              style={styles.imgProfileContainer}>
              {data && data?.profileImg ? (
                <Image
                  source={{
                    uri: data?.profileImg,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{
                    uri: profilePicture,
                  }}
                  style={styles.profileImage}
                />
              )}
            </Card>
            <View
              style={{
                width: '100%',
                // backgroundColor: 'red',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: -50,
                // alignContent: 'flex-end',
              }}>
              <Button onPress={() => setFormEdit(true)}>
                <CommunityIcons name={'pen'} size={25} color="gray" />
              </Button>
            </View>
            {!formEdit ? (
              data ? (
                <UserDetails userDetails={data} />
              ) : (
                <LoadingActivity title="Cargando mis datos personales ..." />
              )
            ) : null}
            {formEdit && <EditMeForm setFormEdit={setFormEdit} />}
          </Card>
          {!formEdit && (
            <Card style={styles.containerLogout}>
              <Button
                mode="elevated"
                textColor="white"
                style={styles.logoutButton}
                onPress={() => handleLogout()}>
                Cerrar sessión
              </Button>
            </Card>
          )}
        </View>
      </LayoutContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  firstCardContainer: {
    width: '100%',
    minHeight: '30%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  firstCardText: {
    fontSize: 30,
    textAlign: 'center',
    maxWidth: '90%',
    flexDirection: 'row',
    fontWeight: 'bold',
    color: 'skyblue',
  },
  secondCardContainer: {
    // position: 'relative',
    // flexDirection: 'row',
    width: '100%',
    minHeight: '50%',
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  imgProfileContainer: {
    top: -60,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerLogout: {
    width: '100%',
    // minHeight: '10%',
    minHeight: 150,
    // marginBottom: 140,
  },
  logoutButton: {
    // position: 'absolute',
    padding: 5,
    width: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 10,
  },
});
