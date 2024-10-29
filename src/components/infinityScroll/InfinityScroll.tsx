import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../config/theme/theme';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import LoadingActivity from '../activity/LoadingActivity';

export default function InfinityScroll() {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const loadMore = () => {
    console.log('Cargando mas');
    const newArray = Array.from({length: 5}, (_, i) => numbers.length + 1);

    setTimeout(() => {
      setNumbers([...numbers, ...newArray]);
    }, 3000);
  };

  return (
    <View>
      <Text>Infinity Scroll</Text>
      <FlatList
        data={numbers}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <Text
            style={{
              height: 300,
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: 50,
            }}>
            {item}
          </Text>
        )}
        ListFooterComponent={() => <LoadingActivity title="Cargando mas..." />}
      />
    </View>
  );
}
