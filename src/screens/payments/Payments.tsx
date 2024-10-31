import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import IoniIcons from 'react-native-vector-icons/Ionicons';

import LayoutContainer from '../../layouts/LayoutContainer';
import ScrollViewContainer from '../../layouts/ScrollViewContainer';
import PDFView from '../invoice/PDFView';
import GenerateQR from './GenerateQR';
import useFetch from '../../hooks/useFetch';
import UserContext from '../../context/Context';
import { Reading } from '../interfaces/reading';
import { formatDate } from '../../helpers/formatDate';
import usePost from '../../hooks/usePost';
import { GenerateQRInterface } from '../interfaces/regerateQR';
// import useFetchEvent from '../../hooks/useFetchEvent';
import LoadingActivity from '../../components/activity/LoadingActivity';
import InfinityScroll from '../../components/infinityScroll/InfinityScroll';
import useFetchEvent from '../../hooks/useFetchEvent';
// import PDFView from '../pdfView/PDFView';

export default function PaymentsScreen() {
  const { token, userProfile } = useContext(UserContext);
  const [visible, setVisible] = useState(false); // Show or hide modal window
  const [readingId, setReadingId] = useState<string>('');
  const [generateQR, setGenerateQR] = useState<boolean | null>(null);
  const [responseQR, setResponseQR] = useState<string>('');
  const [loadingQR, setLoadingQR] = useState<boolean>(false);
  const [errorQR, setErrorQR] = useState<null>(null);
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [showQR, setShowQr] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    limit: 12,
    offset: 0,
  });
  const [data, loading, error] = useFetch<Reading[]>(
    `/reading/ci/${userProfile?.ci}?order=desc&limit=${pagination.limit}&offset=${pagination.offset}`,
    token,
    undefined,
  );
  const [readings, setReadings] = useState<Reading[]>(data as Reading[]);
  useEffect(() => {
    setReadings(data as Reading[]);
  }, [data]);

  const showModal = () => setVisible(true);
  const hideModal = () => (
    setVisible(false), setShowInvoice(false), setShowQr(false)
  );
  console.log(readings, loading, error);

  const handleOnPay = (readingId: string) => {
    console.log('Ver recibo de pago o descargar QR ', readingId);
    setGenerateQR(true);
    setShowQr(true);
    showModal();
    usePost(`/invoice/qr/${readingId}`, '', token!)
      .then(response => {
        setResponseQR(response.bankBNB?.qr);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
        setErrorQR(err);
      })
      .finally(() => { });
  };
  const handleOnViewInvoice = (readingId: string) => {
    console.log('Ver o descargar recibo ', readingId);
    setReadingId(readingId);
    setShowInvoice(true);
    showModal();
  };
  const handleOnPayAll = () => {
    console.log('Pagar todos los meses restantes y descargar recibo');
  };
  const loadMore = () => {
    console.log('Cargando mas');
    // useFetchEvent(`/reading/ci/${userProfile?.ci}?order=desc`, token)
    //   .then(response => {})
    //   .catch(err => {})
    //   .finally(() => {});

    setTimeout(() => {
      // setReadings([...readings, ...readings]);
    }, 3000);
  };

  return (
    <LayoutContainer>
      <View style={styles.cardFixed}>
        <Portal>
          {showQR && (
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                // width: '100%',
                margin: 10,
                borderRadius: 10,
                height: '70%',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'green',
                  textDecorationLine: 'underline',
                }}>
                QR Banco Nacional de Bolivia BNB
              </Text>
              {responseQR ? (
                <GenerateQR qr={String(responseQR)} />
              ) : (
                <LoadingActivity title="Cargando codigo QR" />
              )}
            </Modal>
          )}
          {showInvoice && (
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                // width: '100%',
                margin: 10,
                borderRadius: 10,
                height: '70%',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 10,
              }}>
              <Text>Recibo de pago</Text>
              <PDFView readingId={String(readingId)} />
              <Button mode="contained" onPress={() => { }}>
                Descargar
              </Button>
            </Modal>
          )}
        </Portal>
        {/* <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          {`${new Date().getFullYear()}`}
        </Text> */}
        <Button
          mode="elevated"
          icon="qrcode-scan"
          onPress={() => handleOnPayAll()}
          style={{
            marginBottom: 10,
            backgroundColor: '#FF5C00',
            borderRadius: 10,
          }}
          textColor="white">
          <Text style={{ color: 'white', padding: 10, fontSize: 20 }}>
            64Bs. Pagar todo
          </Text>
        </Button>
      </View>
      {readings && !loading ? (
        <FlatList
          data={readings}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }: { item: Reading }) => (
            <CardContainer
              key={item._id + 'ssxc'}
              styles={styles}
              item={item}
              handleOnPay={handleOnPay}
              handleOnViewInvoice={handleOnViewInvoice}
            />
          )}
        />
      ) : loading ? (
        <LoadingActivity title="Cargando mis lecturas de medidor ..." />
      ) : (
        <Text>No se encontraron lectura o hubo un error {error}</Text>
      )}
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  cardFixed: {
    // marginTop: 10,
    // marginRight: 10,
    // marginLeft: 10,
  },
  cardContainer: {
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  boxHorizontal: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '28%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 6,
    alignSelf: 'center',
  },
  buttonPay: {
    // backgroundColor: '#009A2B',
    borderRadius: 10,
    width: '40%',
  },
});

function CardContainer({ styles, item, handleOnPay, handleOnViewInvoice }: any) {
  return (
    <Card mode="elevated" style={styles.cardContainer}>
      <Card.Content style={styles.boxContainer}>
        <View style={styles.boxHorizontal}>
          <IoniIcons name="calendar" size={28} color="#009A2B" />
          <Text style={styles.textPrimary}>
            {formatDate(item.date, 'MMMM').toLocaleUpperCase()}
          </Text>
          <Text
            style={{
              paddingTop: 4,
            }}>{`  ${new Date().getFullYear()}`}</Text>
        </View>
        <View style={styles.boxHorizontal}>
          <IoniIcons name="water" size={28} color="skyblue" />
          <Text style={styles.textPrimary}>
            {item.cubicMeters}m{'\u00B3'}
          </Text>
        </View>
      </Card.Content>
      <Divider horizontalInset={true} bold={true} />
      <Card.Content style={styles.boxContainer}>
        <Text style={{ color: 'black', fontSize: 20 }}>Anterior 20Bs</Text>
        <Button
          mode="elevated"
          icon={item?.invoice?.isPaid ? 'eye' : 'qrcode-scan'}
          onPress={() => {
            item?.invoice?.isPaid
              ? handleOnViewInvoice(String(item._id))
              : handleOnPay(String(item._id));
          }}
          style={styles.buttonPay}
          buttonColor={item?.invoice?.isPaid ? 'gray' : '#009A2B'}
          textColor="white">
          {item?.invoice?.isPaid ? 'Ver recibo' : `${item.balance}Bs. Pagar`}
        </Button>
      </Card.Content>
    </Card>
  );
}
