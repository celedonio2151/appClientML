import React, {useContext, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import requestPermission from '../../helpers/permissionDownload';
import {dateNameCustom} from '../../helpers/formatDate';
import UserContext from '../../context/Context';

export default function DownloadPDF() {
  const {token} = useContext(UserContext);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const invoiceUrl = 'http://elvex.ugr.es/decsai/java/pdf/3c-relaciones.pdf';
  const imageUrl =
    'https://codigoencasa.com/content/images/size/w1000/2022/07/nESTjs2.JPG';

  const requestStoragePermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () => console.log('Permission denied'),
      onPermissionGranted: () => downloadInvoicePDF(),
    });
  };

  const downloadInvoicePDF = () => {
    const date = new Date();
    const invoiceName = dateNameCustom(date, 'dddd_DD_MMMM_YYYY_HH_mm');
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Recibo.pdf`,
        path: `${dirs.DownloadDir}/Recibo_${invoiceName}.pdf`,
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Recibo.pdf',
      path: `${dirToSave}/Recibo_${invoiceName}.pdf`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
      .fetch('GET', invoiceUrl, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log('file downloaded');
          Alert.alert('Recibo descargado correctamente');
        }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
      });
  };

  const fetchFiles = () => {
    RNFetchBlob.config({
      fileCache: false,
    })
      .fetch('GET', imageUrl, {
        Authorization: 'Bearer access-token...',
      })
      .then(res => {
        const status = res.info().status;
        if (status === 200) {
          const base64Str = res.base64();
          setImageBase64(`data:image/jpeg;base64,${base64Str}`);
        } else {
          console.log('Error: No se pudo descargar la imagen');
        }
      })
      .catch((errorMessage, statusCode) => {
        console.log(errorMessage, statusCode);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>File Download Demo App</Text>
      <Text style={styles.titleText}>{invoiceUrl}</Text>

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => {
          if (Platform.OS === 'android') {
            requestStoragePermission();
          } else {
            console.log('Descarga de PDF no disponible en iOS');
          }
        }}>
        <Text style={styles.textStyle}>Download PDF</Text>
      </TouchableOpacity>

      <Button
        mode="contained-tonal"
        onPress={() => {
          if (Platform.OS === 'android') {
            fetchFiles();
          } else {
            console.log('Permiso denegado');
          }
        }}>
        Download Image
      </Button>

      {imageBase64 && (
        <Image
          source={{uri: imageBase64}}
          style={{width: 500, height: 500, marginTop: 20}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 25,
  },
  btnStyle: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: 150,
    height: 40,
  },
});
