import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';
import { Board as BoardType } from './types';
import { WIDTH } from './gameConfig';

type BoardProps = {
  board: BoardType;
  selectedPiece: { row: number; col: number } | null;
  onCellPress: (row: number, col: number) => void;
};

export const Board = ({ board, selectedPiece, onCellPress }: BoardProps) => (
  <View style={styles.board}>
    {board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <Cell
            key={colIndex}
            cell={cell}
            isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
            onPress={() => onCellPress(rowIndex, colIndex)}
          />
        ))}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: {
    width: WIDTH,
    height: WIDTH * 1.3,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 10,
    marginVertical: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
  }
});
