import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const FavoriteScreen = () => {
  useEffect(() => {
    console.log('favorite');
  }, []);
  return (
    <View style={ styles.container }>
      <Text>Favorite scree</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default FavoriteScreen;