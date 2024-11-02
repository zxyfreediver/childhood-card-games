import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Board } from './Board';
import { Footer } from './Footer';
import { useDragonTiger } from './useDragonTigers';

export const DragonTiger = () => {
  const { gameState, handleCellPress, resetGame } = useDragonTiger();
  const { board, currentPlayer, selectedPiece, player1Color, player2Color } = gameState;

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {`玩家 ${currentPlayer} 回合`}
      </Text>
      
      <Board 
        board={board}
        selectedPiece={selectedPiece}
        onCellPress={handleCellPress}
      />
      
      <Footer 
        player1Color={player1Color}
        player2Color={player2Color}
        onReset={resetGame}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  turnText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  }
});
