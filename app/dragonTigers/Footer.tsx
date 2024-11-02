import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FooterProps = {
  player1Color: string;
  player2Color: string;
  onReset: () => void;
};

export const Footer = ({ player1Color, player2Color, onReset }: FooterProps) => (
  <View style={styles.footer}>
    <View style={styles.playerInfo}>
      <View style={[styles.colorIndicator, { backgroundColor: player1Color }]} />
      <Text style={styles.playerText}>玩家 1</Text>
    </View>
    <TouchableOpacity 
      style={[styles.button, styles.resetButton]} 
      onPress={onReset}
    >
      <Text style={styles.buttonText}>重新开始</Text>
    </TouchableOpacity>
    <View style={styles.playerInfo}>
      <View style={[styles.colorIndicator, { backgroundColor: player2Color }]} />
      <Text style={styles.playerText}>玩家 2</Text>
    </View>
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
  playerInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },
  playerText: {
    fontSize: 16,
    fontWeight: "bold"
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
