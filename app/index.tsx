import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DragonTiger } from './dragonTigers';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <DragonTiger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
