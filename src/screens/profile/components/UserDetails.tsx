import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useAppTheme} from '../../../..';
import {Divider, List, Text} from 'react-native-paper';
import {UserProfileInterface} from '../../../interfaces/Interfaces';
import {formatDate} from '../../../helpers/formatDate';

export default function UserDetails({
  userDetails,
}: {
  userDetails: UserProfileInterface;
}) {
  const stylesC = styleCustom();
  return (
    <View style={stylesC.userInfoContainer}>
      <View style={stylesC.userNameRole}>
        <Text
          style={
            stylesC.userName
          }>{`${userDetails.name} ${userDetails.surname}`}</Text>
        <Text style={stylesC.userRole}>
          {userDetails.roles.map((rol: string) => rol)}
        </Text>
      </View>
      <List.Section>
        {/* <List.Subheader>Some title</List.Subheader> */}
        <List.Item
          title={`CI: ${userDetails.ci}`}
          left={() => <List.Icon icon="smart-card" />}
        />
        <Divider />
        {userDetails?.phone_number && (
          <List.Item
            title={`Cel: ${userDetails.phone_number}`}
            left={() => <List.Icon color={''} icon="phone" />}
          />
        )}
        <Divider />
        {userDetails?.email && (
          <>
            <List.Item
              title={`Email: ${userDetails.email}`}
              left={() => <List.Icon color={''} icon="email" />}
            />
            <Divider />
          </>
        )}
        {userDetails?.birthdate && (
          <>
            <List.Item
              title={formatDate(
                new Date(userDetails?.birthdate),
                'dddd DD MMM YYYY',
              )}
              left={() => <List.Icon color={''} icon="calendar" />}
            />
            <Divider />
          </>
        )}
        <List.Item
          title={`Estado del medidor`}
          left={() => (
            <List.Icon
              color={'green'}
              icon={userDetails.status ? 'check' : 'close'}
            />
          )}
        />
        <Divider />
      </List.Section>
      <Divider />
      <View style={stylesC.userInfoParent}>
        <Text style={stylesC.userInfo}>Estado:</Text>
        <Text style={stylesC.userInfo}>
          {userDetails.status ? statusBox('green') : statusBox('red')}
        </Text>
      </View>
      <View style={stylesC.userInfoParent}>
        <Text style={stylesC.userInfo}>
          Sessiones activas: {userDetails.devices}
        </Text>
        <Text style={stylesC.userInfo}>
          {userDetails.status ? statusBox('green') : statusBox('red')}
        </Text>
      </View>
      <Divider />
    </View>
  );
}

function styleCustom() {
  const {colors} = useAppTheme();

  return StyleSheet.create({
    imgProfileContainer: {
      top: -60,
      alignSelf: 'center',
      width: 'auto',
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 1,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    userInfoContainer: {
      width: '100%',
      padding: 20,
      // paddingTop: 80,
      // backgroundColor: 'orange',
      color: 'black',
      borderRadius: 10,
      // top: -100,
    },
    userNameRole: {paddingBottom: 20},
    userName: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
    },
    userRole: {fontSize: 18, color: colors.darkGray},
    userInfoParent: {
      // flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    userInfo: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black',
    },
    containerLogout: {
      width: '100%',
    },
    logoutButton: {
      // position: 'absolute',
      padding: 5,
      width: '100%',
      backgroundColor: '#FF0000',
      borderRadius: 10,
    },
  });
}

function statusBox(color: string) {
  return (
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: color,
      }}></View>
  );
}
