import {StyleSheet, ScrollView, StyleProp, ViewStyle} from 'react-native';
import React, {Children, ReactNode} from 'react';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const defaultStyle: ViewStyle = {
  flex: 1,
};

export default function ScrollViewContainer({
  style,
  children,
}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={[defaultStyle, style]}
      contentContainerStyle={styles.scrollContent}
      // contentInsetAdjustmentBehavior="automatic"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'green',
    // borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1, // Establece el contenido del ScrollView para que crezca según sea necesario
    // padding: 10,
  },
});
