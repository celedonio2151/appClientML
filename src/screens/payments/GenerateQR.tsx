import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';
import {Button} from 'react-native-paper';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {
  DocumentDirectoryPath,
  DownloadDirectoryPath,
  writeFile,
  copyFile,
} from 'react-native-fs';

import {formatDate} from '../../helpers/formatDate';
import requestPermission from '../../helpers/permissionDownload';
import {GenerateQRInterface} from '../interfaces/regerateQR';
// {id, qr, success, message}: PropsBank
export default function GenerateQR({
  responseBNB,
}: {
  responseBNB: GenerateQRInterface;
}) {
  const imageUrl =
    'https://codigoencasa.com/content/images/size/w1000/2022/07/nESTjs2.JPG';
  const viewRef = useRef(null);
  const codeQR = responseBNB.bankBNB.qr;

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      console.log('uri', uri);
      // Configura el objeto para compartir
      const shareOptions = {
        title: 'Compartir QR',
        message: 'Aquí tienes el QR',
        url: uri,
        type: 'image/png',
      };
      const shareResponse = await Share.open(shareOptions);
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('Rrror al compartit la imagen ', error);
    }
  };

  const requestStoragePermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () => console.log('Permission denied'),
      onPermissionGranted: () => saveImage(),
    });
  };

  const saveImage = async () => {
    const nameFile = formatDate(new Date(), 'DD-MMM-YYYY');
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 0.8,
    });
    // console.log('uri', uri);
    const path = `${DownloadDirectoryPath}/CodigoQR_BNB_${nameFile}.png`;

    console.log('🚀 ~ saveImage ~ path:', path);
    try {
      await copyFile(uri, path);
      Alert.alert(
        'Codigo QR guardado correctamente',
        'En la carpeta de descargas',
        [{text: 'Aceptar', style: 'destructive'}],
      );
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>QR Banco Nacional de Bolivia BNB</Text>
      </View>
      <View ref={viewRef} style={styles.containerImg}>
        <View style={styles.containerAdditional}>
          <View style={styles.aditionalRow}>
            <Text style={{color: 'black', flex: 4, fontSize: 13}}>
              {responseBNB.aditional.name}
            </Text>
            <Text style={{color: 'black', flex: 1, fontSize: 13}}>
              Mes: {formatDate(new Date(responseBNB.aditional.month), 'MMMM')}{' '}
            </Text>
          </View>
          <View style={styles.aditionalRow}>
            <Text style={{color: 'black', flex: 1, fontSize: 13}}>
              Saldo: {responseBNB.aditional.amount}Bs
            </Text>
            <Text style={{color: 'black', flex: 1, fontSize: 13}}>
              Uso único: {responseBNB.aditional.singleUse ? 'SI' : 'NO'}{' '}
            </Text>
            <Text style={{color: 'black', flex: 1, fontSize: 13}}>
              Expira:{' '}
              {formatDate(
                new Date(responseBNB.aditional.expirationDate),
                'DD-MM-YYYY',
              )}
            </Text>
          </View>
        </View>
        <Image
          source={{uri: `data:image/png;base64,${codeQR}`}}
          style={styles.imageQR}
        />
      </View>
      <View style={styles.containerButton}>
        <Button
          mode="elevated"
          buttonColor="#009A2B"
          style={styles.downloadButton}
          textColor="white"
          icon={'download'}
          onPress={requestStoragePermission}>
          Descargar
        </Button>
        <Button
          icon={'share'}
          buttonColor="#00BCD4"
          textColor="#FFFF"
          mode="elevated"
          onPress={shareImage}
          style={styles.sharedButton}>
          Compartir
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 25,
    width: '100%',
    // height: 300,
    padding: 10,
  },
  containerTitle: {
    // backgroundColor: "skyblue",
    width: '100%',
    alignItems: 'center',
    height: '6%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    height: 'auto',
    textDecorationLine: 'underline',
  },
  containerImg: {
    width: '100%',
    height: '85%',
    // padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'skyblue',
  },
  containerAdditional: {padding: 5, height: '10%'},
  aditionalRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageQR: {
    flex: 1,
    // resizeMode: 'contain',
    borderRadius: 10,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: '10%',
    // backgroundColor: 'skyblue',
  },
  downloadButton: {
    width: '48%',
    borderRadius: 10,
  },
  sharedButton: {
    width: '48%',
    borderRadius: 10,
  },
});
