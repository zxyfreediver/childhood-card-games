import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FooterProps = {
  player1Color: string;
  player2Color: string;
  onReset: () => void;
};

export const Footer = ({ player1Color, player2Color, onReset }: FooterProps) => (
  <View style={styles.footer}>
    <TouchableOpacity 
      style={[styles.button, styles.resetButton]} 
      onPress={onReset}
    >
      <Text style={styles.buttonText}>重新开始</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  resetButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 30,
    paddingVertical: 12
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
