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
    height: CELL_SIZE * 1.4,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  selectedCell: {
    borderWidth: 2,
    borderColor: "#FFD700",
    elevation: 8,
    shadowOpacity: 0.5
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  cellText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold"
  },
  powerText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 8,
  }
});
