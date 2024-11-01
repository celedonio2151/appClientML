import { View, Text, Image, PermissionsAndroid, Platform, Alert, Dimensions, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { dateNameCustom } from '../../helpers/formatDate';
import RNFetchBlob from 'rn-fetch-blob';
import requestPermission from '../../helpers/permissionDownload';
import UserContext from '../../context/Context';
interface PropsBank {
  id: string;
  qr: string;
  success: boolean;
  message: string;
}
// {id, qr, success, message}: PropsBank
export default function GenerateQR({ qr }: { qr: string }) {
  const imageUrl =
    'https://codigoencasa.com/content/images/size/w1000/2022/07/nESTjs2.JPG';
  const { token } = useContext(UserContext)
  const response = {
    id: '113954',
    qr: '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',
    success: true,
    message: '',
  };

  const requestStoragePermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () => console.log('Permission denied'),
      onPermissionGranted: () => downloadImageQRBNB(),
    });
  };

  const downloadImageQRBNB = () => {
    const date = new Date();
    const imageName = dateNameCustom(date, 'dddd_DD_MMMM_YYYY_HH_mm');
    const { dirs } = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      appendExt: 'png',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Codigo.png`,
        path: `${dirs.DownloadDir}/Codigo_QR_${imageName}.png`,
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Recibo.pdf',
      path: `${dirToSave}/Recibo_${imageName}.png`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
      .fetch('POST', imageUrl, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log('file downloaded');
          Alert.alert('Imagen codigo QR de BNB descargado correctamente');
        }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>QR Banco Nacional de Bolivia BNB</Text>
      </View>
      <View style={styles.containerImg}>
        <Image
          source={{ uri: `data:image/png;base64,${qr}` }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <Button
          mode='elevated'
          buttonColor='green'
          style={styles.downloadButton}
          textColor='white'
          icon={"download"}
          onPress={requestStoragePermission}>
          Descargar
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
    // width: 100,
    // height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    textDecorationLine: 'underline',
  },
  containerImg: {
    width: '100%',
    height: '84%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  containerButton: {
    display: 'flex',
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButton: {
    width: "100%",
  }

});