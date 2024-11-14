import {View, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, HelperText, Text, TextInput} from 'react-native-paper';

import usePost from '../../hooks/usePost';
import Developed from '../../components/footer/Developed';
import {useAppTheme} from '../../..';
import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';

export default function SignInReader({setLogin, navigation}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Mensajes de Validación del Formulario
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: {password: string}) => {
    console.log(data);
    // postRequest({ci: data.ci})
    //   .then((response: any) => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log({err});
    //     setError(true);
    //     setErrorMessage(err.message);
    //   })
    //   .finally(() => setLoading(false));
  };

  const stylesC = stylesCustom();

  return (
    <ScrollViewContainer>
      <LayoutContainer style={{justifyContent: 'space-between'}}>
        <Card mode="elevated" elevation={2} style={stylesC.firstCard}>
          <Card.Content>
            <Text style={stylesC.title}>
              Ingreso exclusivo para los lecturadores
            </Text>
          </Card.Content>
        </Card>
        <Card mode="elevated" elevation={2} style={stylesC.thirdCard}>
          <Card.Content style={stylesC.formGroup}>
            <Text style={styles.text}>
              Ingresa la contraseña para continuar:
            </Text>
            <Controller
              control={control}
              rules={{
                validate: value => {
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
                  // error={errors.password && true}
                  // outlineColor={'red'}
                  outlineStyle={{
                    borderRadius: 10,
                  }}
                  onChangeText={onChange}
                  // onBlur={onBlur}
                  right={<TextInput.Icon icon="smart-card" />}
                  {...register('password', {
                    required: true,
                  })}
                />
              )}
              name="password"
            />
            {errors.password && (
              <HelperText padding="normal" type="error" visible={true}>
                {errors.password.message || '*Campo obligatorio'}
              </HelperText>
            )}
            <Button
              mode="elevated"
              style={styles.buttonStyle}
              buttonColor="#009A2B"
              disabled={false}
              onPress={handleSubmit(onSubmit)}>
              <Text style={{fontSize: 15, color: 'white', padding: 5}}>
                Continuar
              </Text>
            </Button>
          </Card.Content>
          <View style={styles.form}>
            {/* <TextInput
              mode="outlined"
              style={styles.input}
              outlineStyle={{
                borderRadius: 10,
                borderColor: '#00BCD4',
              }}
              placeholder="Contraseña"
              label="Contraseña"
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange('password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button
              mode="elevated"
              style={styles.buttonStyle}
              buttonColor="#009A2B"
              disabled={isSubmitting}
              onPress={e => handleSubmit()}>
              <Text style={{fontSize: 15, color: 'white', padding: 5}}>
                Continuar
                </Text>
              </Button> */}
          </View>
        </Card>
        <Developed />
      </LayoutContainer>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 20,
    height: '70%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    width: '96%',
    textAlign: 'center',
    // backgroundColor: 'yellow',
    height: '50%',
  },
  form: {
    width: '100%',
    height: '40%',
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // padding: 10,
    // marginBottom: 5,
  },
  buttonStyle: {width: '100%', borderRadius: 10, marginTop: 15},
  errorText: {
    fontSize: 14,
    color: 'red',
    // marginLeft: 20,
  },
});

function stylesCustom() {
  const {colors, whiteC, blackC} = useAppTheme();

  const styles = StyleSheet.create({
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
      backgroundColor: colors.whiteC,
      // width: '100%',
      // height: '45%',
      minHeight: 200,
    },
    thirdCard: {
      backgroundColor: colors.secondary,
      // minHeight: 200,
      height: 200,
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
