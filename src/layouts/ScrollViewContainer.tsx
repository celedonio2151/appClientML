import {
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import React, {Children, ReactNode} from 'react';
// import {RefreshControl} from 'react-native-gesture-handler';

interface Props {
  style?: StyleProp<ViewStyle>;
  isRefreshing?: boolean;
  top?: any;
  onRefresh?: () => void;
  children: ReactNode;
}

const defaultStyle: ViewStyle = {
  flex: 1,
};

export default function ScrollViewContainer({
  style,
  isRefreshing,
  top,
  onRefresh,
  children,
}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={[defaultStyle, style]}
      contentContainerStyle={styles.scrollContent}
      // contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing || false}
          progressViewOffset={top}
          colors={['red', 'orange', 'green']}
          onRefresh={onRefresh}
        />
      }>
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
