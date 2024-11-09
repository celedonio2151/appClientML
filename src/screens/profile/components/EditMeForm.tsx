import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DatePickerInput, DatePickerModal} from 'react-native-paper-dates';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import UserContext from '../../../context/Context';
import useFetch from '../../../hooks/useFetch';
import {Button, Card, HelperText, TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {useAppTheme} from '../../../..';
import LoadingActivity from '../../../components/activity/LoadingActivity';
import {UserProfileInterface} from '../../../interfaces/Interfaces';

interface BodyData {
  email: string;
  phone_number: string;
  birthdate: string;
  profileImg: string;
}

export default function EditMeForm({setFormEdit}): React.JSX.Element {
  const {token} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputDate, setInputDate] = useState<Date | null>(new Date()); // Input Date Picker
  const [myData, loadingMe, errorMe] = useFetch<UserProfileInterface>(
    `/user/me`,
    token,
  );

  // console.log(myData, loading, error);
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      phone_number: '',
      birthdate: '2024-11-06T04:00:00.000Z',
      profileImg: '',
    },
  });

  useEffect(() => {
    if (myData) {
      setValue('email', myData?.email || '');
      setValue('phone_number', String(myData?.phone_number));
      // setValue('birthdate', String(myData?.birthdate));
      myData.birthdate
        ? setInputDate(new Date(myData.birthdate))
        : setInputDate(null);
    }
    return () => {};
  }, [myData]);

  const onSubmit = (data: BodyData) => {
    const body = {
      email: data.email,
      phone_number: data.phone_number,
      birthdate: inputDate,
    };
    console.log('This is the data to submit', body);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // usePost(`/auth/user/signin`, {ci: data.ci})
    //   .then((response: any) => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     setError(true);
    //     setErrorMessage(err.message);
    //   })
    //   .finally(() => setLoading(false));
  };

  const stylesC = stylesCustom();

  return (
    <View>
      <Text style={stylesC.title}>Actualizar mis datos personales</Text>
      <Button
        mode="elevated"
        buttonColor="red"
        loading={true}
        onPress={() => setFormEdit(false)}>
        Cancelar
      </Button>
      {myData && !loadingMe ? (
        <Card>
          <Card.Content style={stylesC.formGroup}>
            <Controller
              control={control}
              rules={{
                validate: value => {
                  // console.log({value});
                  // return !!value || '*Campo requerido';
                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  keyboardType="default"
                  label="Email"
                  placeholder="Email"
                  value={value}
                  error={errors.email && true}
                  // outlineColor={'red'}
                  outlineStyle={{
                    borderRadius: 10,
                  }}
                  onChangeText={onChange}
                  // onBlur={onBlur}
                  right={<TextInput.Icon icon="email" />}
                  {...register('email', {
                    required: false,
                  })}
                />
              )}
              name="email"
            />
            {errors.email && (
              <HelperText padding="normal" type="error" visible={true}>
                {errors.email.message || '*Campo obligatorio'}
              </HelperText>
            )}
            <Controller
              control={control}
              rules={{
                validate: value => {
                  // console.log({value});
                  // return !!value || '*Campo requerido';
                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  keyboardType="number-pad"
                  label="Número de celular"
                  placeholder="Número de celular"
                  value={value}
                  error={errors.phone_number && true}
                  // outlineColor={'red'}
                  outlineStyle={{
                    borderRadius: 10,
                  }}
                  onChangeText={onChange}
                  // onBlur={onBlur}
                  right={<TextInput.Icon icon="cellphone" />}
                  {...register('phone_number', {
                    required: false,
                  })}
                />
              )}
              name="phone_number"
            />
            {errors.phone_number && (
              <HelperText padding="normal" type="error" visible={true}>
                {errors.phone_number.message || '*Campo obligatorio'}
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
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <DatePickerInput
                style={{borderRadius: 10}}
                locale="es"
                mode="outlined"
                label="Fecha de nacimiento"
                value={inputDate}
                onChange={d => setInputDate(d)}
                inputMode="start"
              />
            </View>
          </Card.Content>
          <Card.Content style={stylesC.formGroup}>
            <Button
              mode="elevated"
              buttonColor="#009A2B"
              style={stylesC.loginButton}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}>
              <Text style={stylesC.loginButtonText}>Actualizar mis datos</Text>
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <LoadingActivity title="Cargando mis datos..." size="small" />
      )}
    </View>
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
      fontSize: 22,
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
