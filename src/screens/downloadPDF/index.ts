import RNFetchBlob from 'rn-fetch-blob';
import { Platform, PermissionsAndroid, PermissionStatus } from 'react-native';

/// Conceder permiso en Android
export const getDownloadPermissionAndroid = async (): Promise<boolean> => {
  try {
    const granted: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permiso para descargar archivos',
        message: 'Se requiere su permiso para guardar archivos en su dispositivo',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.log('Error solicitando permisos', err);
    return false;
  }
};

export const downloadFile = async (url: string): Promise<RNFetchBlob.FetchBlobResponse | null> => {
  const { config, fs } = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  const filename = url.split('/').pop();
  const fileExtension = filename ? filename.split('.').pop() : 'pdf';
  const imagePath = `${cacheDir}/${filename}`;

  try {
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: imagePath,
        appendExt: fileExtension,
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: fileExtension,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'Archivo',
        },
      },
    });

    if (configOptions) {
      const response = await RNFetchBlob.config(configOptions).fetch('GET', url);
      return response;
    } else {
      throw new Error('Configuración no disponible para esta plataforma');
    }
  } catch (error) {
    console.error('Error descargando archivo:', error);
    return null;
  }
};
