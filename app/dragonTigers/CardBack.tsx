import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const CardBack = () => (
  <Image
    source={require('@/assets/images/react-logo.png')}
    style={styles.cardBackImage}
  />
);

const styles = StyleSheet.create({
  cardBackImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
