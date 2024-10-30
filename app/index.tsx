import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimalChess from './AnimalChess';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AnimalChess />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
