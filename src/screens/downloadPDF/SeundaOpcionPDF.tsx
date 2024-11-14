import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {Button} from 'react-native-paper';
import requestPermission from '../../helpers/permissionDownload';
import {dateNameCustom} from '../../helpers/formatDate';

export default function SegunaOpcionPDF() {
  const invoiceUrl = 'http://elvex.ugr.es/decsai/java/pdf/3c-relaciones.pdf';
  const getPermission = async () => {
    await requestPermission({
      permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      onPermissionDenied: () => console.log('Permission denied'),
      onPermissionGranted: () => downloadInvoicePDF(),
    });
  };

  const downloadInvoicePDF = () => {
    const date = new Date();
    const invoiceName = dateNameCustom(date, 'dddd_DD_MMMM_YYYY_HH_mm');
    console.log('🚀 ~ downloadInvoicePDF ~ invoiceName:', invoiceName);
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
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
      title: 'Invoice.pdf',
      path: `${dirToSave}/Recibo_${invoiceName}.pdf`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
      .fetch('GET', invoiceUrl, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log('file downloaded');
        }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
      });
  };
  return (
    <View>
      <Text>index</Text>
      <Button mode="elevated" onPress={getPermission}>
        Descargar PDF
      </Button>
    </View>
  );
}
