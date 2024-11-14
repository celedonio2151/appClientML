import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {Children, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export default function ScrollViewContainer({
  children,
}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={styles.scrollView}
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
