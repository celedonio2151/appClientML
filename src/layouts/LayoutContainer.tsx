import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const defaultStyle: ViewStyle = {
  flex: 1,
  margin: 10,
  backgroundColor: 'rgba(0, 0, 255, 0)',
  // justifyContent: 'space-between',
  // width: '100%',
  height: '100%',
};

export default function LayoutContainer({style, children}: Props) {
  return <View style={[defaultStyle, style]}>{children}</View>;
}

// LayoutContainer.defaultProps = {
//   style: {},
//   children: null,
// };
