import {Platform, PermissionsAndroid, Permission} from 'react-native';

type PermissionOptions = {
  permission: Permission;
  onPermissionGranted: () => void;
  onPermissionDenied?: () => void;
};

export default async function requestPermission({
  permission,
  onPermissionGranted,
  onPermissionDenied,
}: PermissionOptions): Promise<void> {
  if (Platform.OS === 'ios') {
    onPermissionGranted();
    return;
  }

  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Downloader PDF App Permission',
      message:
        'Cool Photo App needs access to your camera so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    console.log('🚀 ~ granted:', granted);
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    if (PermissionsAndroid.RESULTS.GRANTED) {
      onPermissionGranted();
    } else {
      onPermissionDenied?.();
      console.log('Permission denied');
    }
  } catch (err) {
    console.log('Error requesting permission:', err);
  }
}
