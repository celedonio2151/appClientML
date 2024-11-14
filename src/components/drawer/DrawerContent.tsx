import {View, Linking, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDate} from '../../helpers/formatDate';
import UserContext from '../../context/Context';

export default function DrawerContent(props: any) {
  const {logout, userProfile} = useContext(UserContext);

  return (
    <DrawerContentScrollView contentContainerStyle={{flexGrow: 1}} {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          // height: '100%',
        }}>
        <View style={styles.userInfoSection}>
          {userProfile?.profileImg && (
            <Avatar.Image
              // source={{
              //   uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              // }}
              source={{uri: userProfile?.profileImg}}
              size={50}
            />
          )}
          <Title style={styles.title}>
            {`${userProfile?.name}  ${userProfile?.surname}`}
          </Title>
          <Caption style={styles.caption}>{userProfile?.roles}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View>
          {/* </View>
        <View> */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons name="tune" color={color} size={size} />
              )}
              label="Preferences"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Bookmarks"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="speedometer"
                  color={color}
                  size={size}
                />
              )}
              label={`Lecturar ${formatDate(new Date(), 'MMMM YYYY')}`}
              onPress={() => props.navigation.navigate('Reader')}
            />
          </Drawer.Section>
        </View>
        {/* <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
        <View>
          <DrawerItem
            style={styles.buttonClose}
            icon={({color, size}) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Cerrar sessíon"
            onPress={() => logout()}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonClose: {
    borderRadius: 10,
    backgroundColor: 'red',
    // flex: 1, // Occupy full available space
    // justifyContent: 'flex-end', // Center horizontally
    // alignContent: 'center',
    // alignItems: 'center',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
});
