import {View} from 'react-native';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {Text} from 'react-native-paper';

export default function Developed() {
  return (
    <View style={{marginTop: 10}}>
      <Text variant="bodyMedium" style={{alignSelf: 'center'}}>
        Power by @Skyline with{' '}
        <CommunityIcons name="heart" color={'#FF0000'} size={14} />
      </Text>
    </View>
  );
}
