import React from 'react';
import { View, StyleSheet } from 'react-native';
import SimpleGame from '../SimpleGame';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SimpleGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
