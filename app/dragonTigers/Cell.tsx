import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Cell as CellType } from './types';
import { CELL_SIZE } from './gameConfig';
import { CardBack } from './CardBack';

type CellProps = {
  cell: CellType;
  isSelected: boolean;
  onPress: () => void;
};

export const Cell = ({ cell, isSelected, onPress }: CellProps) => (
  <TouchableOpacity
    style={[
      styles.cell,
      cell.isRevealed && cell.color && { backgroundColor: cell.color },
      isSelected && styles.selectedCell
    ]}
    onPress={onPress}
  >
    {!cell.isRevealed ? (
      <CardBack />
    ) : (
      cell.animal && (
        <View style={styles.cardContent}>
          <Text style={styles.cellText}>{cell.animal.name}</Text>
          <Text style={styles.powerText}>{cell.animal.id}</Text>
        </View>
      )
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    backgroundColor: "#fff"
  },
  selectedCell: {
    borderWidth: 3,
    borderColor: "#FFD700",
    elevation: 5
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  powerText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  }
});
