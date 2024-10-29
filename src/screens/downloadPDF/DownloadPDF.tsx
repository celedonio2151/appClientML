import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

import RNFetchBlob from 'rn-fetch-blob';
import {downloadFile, getDownloadPermissionAndroid} from './index';

export default function DownloadPDF() {
  const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';
  return (
    <View>
      <Text style={styles.titleText}>File Download Demo App</Text>
      <Text style={styles.titleText}>{fileUrl}</Text>
      <TouchableOpacity
        style={[styles.btnStyle]}
        onPress={() => {
          if (Platform.OS === 'android') {
            getDownloadPermissionAndroid().then(granted => {
              if (granted) {
                downloadFile(fileUrl);
              }
            });
          } else {
            downloadFile(fileUrl).then(res => {
              RNFetchBlob.ios.previewDocument(res.path());
            });
          }
        }}>
        <Text style={styles.textStyle}>Download</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
