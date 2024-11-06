import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Board } from './Board';
import { Footer } from './Footer';
import { useDragonTiger } from './useDragonTigers';
import { Audio } from 'expo-av';

export const DragonTiger = () => {
  const { gameState, handleCellPress, resetGame } = useDragonTiger();
  const { board, currentPlayer, selectedPiece, player1Color, player2Color } = gameState;

  useEffect(() => {
    let backgroundMusic: Audio.Sound;

    const playBackgroundMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/music/bgm.mp3'),
          { 
            isLooping: true,
            shouldPlay: true,
            volume: 0.5
          }
        );
        backgroundMusic = sound;
        await sound.playAsync();
      } catch (error) {
        console.log('Error playing background music:', error);
      }
    };

    playBackgroundMusic();

    return () => {
      if (backgroundMusic) {
        backgroundMusic.unloadAsync();
      }
    };
  }, []);

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
    paddingVertical: 20,
    backgroundColor: 'rgb(233, 233, 233)',  // 棕色背景
  },
  turnText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 1,
  }
});
