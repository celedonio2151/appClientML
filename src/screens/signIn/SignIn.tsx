import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Controller, useForm} from 'react-hook-form';

import LayoutContainer from '../../layouts/LayoutContainer';
import UserContext from '../../context/Context';
import usePost from '../../hooks/usePost';
import Developed from '../../components/footer/Developed';
import {useAppTheme} from '../../..';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';

export default function SignInScreen(): React.JSX.Element {
  const {setToken, setProfile} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const postRequest = usePost(`/auth/user/signin`);
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      ci: '',
    },
  });
  // const intervalId = setInterval(() => {
  //   console.log('Cada 3 segundos');
  // }, 3000);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setErrorMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDeleteError = () => {
    setError(false);
    setErrorMessage(null);
  };
  const onSubmit = (data: {ci: string}) => {
    console.log(data);
    setLoading(true);
    usePost(`/auth/user/signin`, {ci: data.ci})
      .then((response: any) => {
        setToken(response.token);
        setProfile(response.loginUser);
        // console.log(response);
      })
      .catch(err => {
        // console.log(err);
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };
  // console.log(error, errorMessage);

  const stylesC = stylesCustom();

  return (
    <ScrollViewContainer>
      <LayoutContainer>
        <View style={stylesC.container}>
          {/* ==========  PHOTO OF TOWN  ========= */}
          <Card mode="elevated" elevation={2}>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          {/* ==========  CARD TITLE TOWN  ======== */}
          <Card mode="contained" style={stylesC.secondCard}>
            <Card.Content style={{backgroundColor: 'transparent'}}>
              <Text style={stylesC.title}>
                Comite de Agua Potable Mosoj Llajta
              </Text>
            </Card.Content>
          </Card>
          {/* ==========  FORM  ============= */}
          <Card mode="elevated" elevation={2} style={stylesC.thirdCard}>
            <Card style={stylesC.userIcon}>
              <CommunityIcons name="account" color={'black'} size={80} />
            </Card>
            <Card.Content style={stylesC.formGroup}>
              <Controller
                control={control}
                rules={{
                  validate: value => {
                    // console.log({value});
                    return !!value || '*Campo requerido';
                    // return true;
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    keyboardType="number-pad"
                    label="Carnet de Identidad"
                    placeholder="Carnet de Identidad"
                    value={value}
                    error={errors.ci && true}
                    // outlineColor={'red'}
                    outlineStyle={{
                      borderRadius: 10,
                    }}
                    onChangeText={onChange}
                    // onBlur={onBlur}
                    right={<TextInput.Icon icon="smart-card" />}
                    {...register('ci', {
                      required: true,
                    })}
                  />
                )}
                name="ci"
              />
              {errors.ci && (
                <HelperText padding="normal" type="error" visible={true}>
                  {errors.ci.message || '*Campo obligatorio'}
                </HelperText>
              )}
              {/* <Text style={stylesC.textColor}>
                      Carnet de identidad con el que se encuentra registrado
                    </Text> */}
              {error && (
                <HelperText
                  style={{paddingBottom: 0}}
                  padding="normal"
                  type="error"
                  visible={error}>
                  {errorMessage}
                </HelperText>
              )}
            </Card.Content>
            <Card.Content style={stylesC.formGroup}>
              <Button
                mode="elevated"
                buttonColor="#009A2B"
                style={stylesC.loginButton}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}>
                <Text style={stylesC.loginButtonText}>Iniciar sessión</Text>
              </Button>
            </Card.Content>

            <Card.Content style={stylesC.groupFooterOne}>
              <Text style={stylesC.textColor}>
                Emergencias por agua llame al:
                <CommunityIcons name="whatsapp" size={28} color="#009A2B" />
                78457874
              </Text>
            </Card.Content>
            {/* <Button
              title="Go to View PDF"
              onPress={() => navigation.navigate('PDF')}
            /> */}
          </Card>
          {/* ==========  POWER BY @Skyline  ========== */}
          <Developed />
        </View>
      </LayoutContainer>
    </ScrollViewContainer>
  );
}

function stylesCustom() {
  const {colors, whiteC, blackC} = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      minHeight: 800,
      // height: '100%',
      // backgroundColor: 'green',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    firstCard: {},
    secondCard: {
      backgroundColor: colors.whiteC,
      // width: '100%',
      // height: '45%',
      minHeight: 200,
    },
    thirdCard: {
      backgroundColor: colors.secondary,
    },
    title: {
      fontSize: 40,
      // alignSelf: 'center',
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.blackC,
    },
    userIcon: {
      top: -60,
      alignSelf: 'center',
      width: 'auto',
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 10,
    },
    formGroup: {
      // paddingTop: 20,
      marginBottom: 15,
    },
    loginButton: {
      // backgroundColor: '#009A2B',
      borderRadius: 10,
    },
    loginButtonText: {
      color: colors.whiteC,
      fontWeight: 'bold',
      fontSize: 15,
      padding: 5,
    },
    groupFooterOne: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    textColor: {
      color: colors.blackC,
      fontSize: 15,
    },
    errorText: {
      fontSize: 14,
      paddingLeft: 10,
      color: 'red',
      // marginTop: 5,
      // marginLeft: 20,
    },
  });
  return styles;
}
