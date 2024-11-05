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
      style={styles.resetButton} 
      onPress={onReset}
    >
      <Text style={styles.buttonText}>重新开始</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  resetButton: {
    backgroundColor: "rgba(0, 150, 150, 0.9)",  // 半透明的青色
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,  // Android 阴影
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",  // 添加微妙的边框
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});
