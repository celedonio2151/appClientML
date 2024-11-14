import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, Divider, MD2Colors} from 'react-native-paper';

interface Props {
  title?: string;
  size?: 'small' | 'large';
}

export default function LoadingActivity({title, size = 'large'}: Props) {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text
        style={{
          color: `${MD2Colors.green500}`,
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        {title}
      </Text>
      <ActivityIndicator
        animating={true}
        size={size}
        color={MD2Colors.green500}
      />
    </View>
  );
}
