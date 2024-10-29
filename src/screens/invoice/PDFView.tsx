import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
// import Pdf from 'react-native-pdf';
// import {Text} from 'react-native-paper';
import {config} from '../../config/environment';
import {Text} from 'react-native-paper';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';

export default function PDFView({readingId}: {readingId: string}) {
  const source = {
    uri: `${config.SERVER}/invoice/pdf/${readingId}`,
    cache: true,
  };
  // const source = {
  //   // uri: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
  //   uri: `https://pspdfkit.com/downloads/pspdfkit-android-quickstart-guide.pdf`,
  //   cache: true,
  // };

  return (
    <ScrollViewContainer>
      <View>
        <Text>Mi Primer imprsion de PDF</Text>
        {/* <Pdf
          source={source}
          trustAllCerts={false}
          enablePaging={false}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        /> */}
      </View>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    // width: 100,
    // height: 300,
  },
  pdf: {
    backgroundColor: 'red',
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // width: '100%',
    height: 450,
  },
});
