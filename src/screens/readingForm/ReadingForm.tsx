import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';

import LayoutContainer from '../../layouts/LayoutContainer';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../../context/Context';
import usePost from '../../hooks/usePost';
import Developed from '../../components/footer/Developed';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import useFetchEvent from '../../hooks/useFetchEvent';
import {Controller, useForm} from 'react-hook-form';
import {formatDate} from '../../helpers/formatDate';
import useFetch from '../../hooks/useFetch';
import UserDetails from './UserDetails';
import {useAppTheme} from '../../..';
import {config} from '../../config/environment';

export default function ReadingFormScreen({
  route,
  navigation,
}: any): React.JSX.Element {
  const {_id, fullname, ci, meterNumber} = route.params;
  const {token} = useContext(UserContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [meterReading, loadignMeters, errorMeters, handleCancel] = useFetch(
    `/reading/${_id}`,
    token,
  );

  const stylesC = customStyles();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: {
      waterMeterId: String(_id),
      date: `${formatDate(new Date(), 'dddd DD MMM YYYY')}`,
      beforeMonth: `${formatDate(new Date(), 'DD/MM/YYYY')}`,
      beforeMonthValue: '0',
      lastMonthValue: '',
      balance: '0',
      meterImage: '',
    },
  });

  // console.log({_id, fullname, ci, meterNumber});
  // console.log(meterReading, loadignMeters, errorMeters);
  // Actualizar los campos como la fecha de la lectura anterior y el valor
  useEffect(() => {
    if (meterReading) {
      setValue(
        'beforeMonth',
        formatDate(meterReading.lastMonth.date, 'DD/MM/YYYY'),
      ); // Error si no exist
      setValue('beforeMonthValue', String(meterReading.lastMonth.meterValue));
    }
  }, [meterReading]);

  const handleSubmitCubic = (value: number) => {
    const cubic = value - (meterReading?.lastMonth?.meterValue || 0);
    useFetchEvent(`/reading/calculate/balance?cubic=${cubic}`, token)
      .then(resp => {
        // console.log('Cal balance: ', resp);
        setValue('balance', String(resp));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = async () => {
    let formData: FormData = new FormData();
    formData.append('waterMeterId', String(_id));
    formData.append('date', String(new Date()));
    formData.append(
      'beforeMonth',
      JSON.stringify({
        date: meterReading?.lastMonth.date || new Date(),
        meterValue: meterReading?.lastMonth.meterValue || 0,
      }),
    );
    formData.append('lastMonthValue', watch('lastMonthValue'));
    console.log(formData.getParts());
    setLoadingSubmit(true);
    fetch(`${config.SERVER}/reading`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        navigation.navigate('Reader');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingSubmit(false);
        // setTimeout(() => {
        //   setLoadingSubmit(false);
        //   console.log('loading 1s');
        //   navigation.navigate('Reader');
        // }, 1000);
      });
    // reset();
  };
  // Mensajes de Validación del Formulario
  return (
    <LayoutContainer>
      <ScrollViewContainer>
        <View style={stylesC.container}>
          {/* ==========  CARD TITLE TOWN  ======== */}
          <Card mode="contained" style={{backgroundColor: 'white'}}>
            <Card.Content style={{backgroundColor: 'transparent'}}>
              <Text style={stylesC.title}>Registrar consumo de agua para:</Text>
            </Card.Content>
          </Card>
          {/* ==========  FORM  ============= */}
          <Card mode="elevated" elevation={2} style={stylesC.secondCard}>
            <Card.Content style={stylesC.formGroup}>
              <UserDetails
                fullname={fullname}
                ci={ci}
                meterNumber={meterNumber}
              />
              {/* <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Id del medidor"
                    label="Id del medidor"
                    onBlur={onBlur}
                    style={stylesC.formInput}
                    outlineStyle={stylesC.formInputOutline}
                    onChangeText={onChange}
                    value={value}
                    disabled
                  />
                )}
                name="waterMeterId"
              />
              {errors.waterMeterId && (
                <Text style={stylesC.errorText}>Medidor es requerido.</Text>
              )} */}
              {/* ----------------------------------------------------------------------- */}
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      mode="outlined"
                      placeholder="Fecha lectura anterior"
                      label="Fecha lectura anterior"
                      style={stylesC.formInputRowFirst}
                      outlineStyle={stylesC.formInputOutline}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      right={<TextInput.Icon icon="calendar" />}
                      disabled
                    />
                  )}
                  name="beforeMonth"
                />
                {errors.beforeMonth && (
                  <Text style={stylesC.errorText}>
                    La lectura es requerido.
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      mode="outlined"
                      placeholder="Lectura anterior"
                      label="Lectura anterior"
                      style={stylesC.formInputRowSecond}
                      outlineStyle={stylesC.formInputOutline}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      right={<TextInput.Icon icon="speedometer" />}
                      disabled
                    />
                  )}
                  name="beforeMonthValue"
                />
                {errors.beforeMonthValue && (
                  <Text style={stylesC.errorText}>
                    La lectura es requerido.
                  </Text>
                )}
              </View>
              {/* ----------------------------------------------------------------------- */}
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Fecha actual de lectura"
                    label="Fecha actual de lectura"
                    style={stylesC.formInput}
                    outlineStyle={stylesC.formInputOutline}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    right={<TextInput.Icon icon="calendar" />}
                    disabled
                  />
                )}
                name="date"
              />
              {errors.date && (
                <Text style={stylesC.errorText}>La lectura es requerido.</Text>
              )}
              {/* ----------------------------------------------------------------------- */}
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Controller
                  control={control}
                  rules={{
                    // max: 10,
                    // required: true,
                    validate: (value: any) => {
                      return (
                        Number(watch('beforeMonthValue')) <= Number(value) ||
                        'Debe ser mayor'
                      );
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      mode="outlined"
                      keyboardType="number-pad"
                      placeholder={
                        errors.lastMonthValue
                          ? `Campo requerido`
                          : 'Lectura Actual'
                      }
                      label={
                        errors.lastMonthValue?.message
                          ? ` ${String(errors.lastMonthValue.message)} `
                          : 'Lectura Actual'
                      }
                      style={stylesC.formInputRowFirst}
                      outlineStyle={
                        errors.lastMonthValue
                          ? {borderRadius: 10}
                          : stylesC.formInputOutline
                      }
                      // onBlur={onBlur}
                      onChangeText={
                        (handleSubmitCubic(Number(value)), onChange)
                      }
                      error={errors.lastMonthValue && true}
                      value={value}
                      right={<TextInput.Icon icon="water-plus" />}
                      // error={true}
                      // disabled={true}
                      {...register('lastMonthValue', {
                        required: true,
                      })}
                    />
                  )}
                  name="lastMonthValue"
                />
                {/* {errors.lastMonthValue && (
                  <Text style={stylesC.errorText}>
                    {errors.lastMonthValue.message || 'Campo obligatorio'}
                  </Text>
                )} */}
                {/* ----------------------------------------------------------------------- */}
                <Controller
                  control={control}
                  rules={{
                    min: 0,
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      mode="outlined"
                      keyboardType="number-pad"
                      label="Saldo"
                      placeholder="Saldo"
                      style={stylesC.formInputRowSecond}
                      outlineStyle={stylesC.formInputOutline}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={() => {
                        console.log('ejecutando on Focus');
                      }}
                      right={<TextInput.Icon icon="currency-usd" />}
                      value={value}
                      disabled
                    />
                  )}
                  name="balance"
                />
              </View>
              <Button
                mode="elevated"
                buttonColor="#009A2B"
                disabled={loadingSubmit}
                style={stylesC.loginButton}
                onPress={handleSubmit(onSubmit)}>
                <Text style={stylesC.loginButtonText}>Registrar consumo</Text>
              </Button>
            </Card.Content>
            <Card.Content style={stylesC.groupFooterOne}>
              <Text style={stylesC.textColor}>
                Emergencias por agua llame al:
                <CommunityIcons name="whatsapp" size={28} color="#009A2B" />
                78457874
              </Text>
            </Card.Content>
          </Card>
          {/* ==========  POWER BY @Skyline  ========== */}
          <Developed />
        </View>
      </ScrollViewContainer>
    </LayoutContainer>
  );
}

function customStyles() {
  const {colors} = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      // backgroundColor: 'green',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    firstCard: {},
    secondCard: {
      backgroundColor: colors.secondary,
      // width: '100%',
      // height: '45%',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.blackC,
    },
    formGroup: {
      paddingTop: 20,
      marginBottom: 10,
    },
    formInput: {marginTop: 8},
    formInputRowFirst: {marginTop: 8, width: '55%'},
    formInputRowSecond: {marginTop: 8, width: '40%'},
    formInputOutline: {
      borderRadius: 10,
      borderColor: colors.primary,
    },
    loginButton: {
      borderRadius: 10,
      marginTop: 15,
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
      color: colors.textColor,
      fontSize: 15,
    },
    errorText: {
      fontSize: 14,
      color: colors.quaternary,
    },
  });
}
