import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { Cell as CellType } from './types';
import { CELL_SIZE } from './gameConfig';
import { CardBack } from './CardBack';

type CellProps = {
  cell: CellType;
  isSelected: boolean;
  onPress: () => void;
};

export const Cell = ({ cell, isSelected, onPress }: CellProps) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (cell.isRevealed) {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [cell.isRevealed]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };
  
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  return (
    <TouchableOpacity
      style={[styles.cell, isSelected && styles.selectedCell]}
      onPress={onPress}
    >
      <Animated.View style={[styles.cardSide, backAnimatedStyle]}>
        <CardBack />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.cardSide, 
          frontAnimatedStyle, 
          cell.color && { backgroundColor: cell.color }
        ]}
      >
        {cell.animal && (
          <View style={styles.cardContent}>
            <Text style={styles.cellText}>{cell.animal.name}</Text>
            <Text style={styles.powerText}>{cell.animal.id}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE - 8,
    height: (CELL_SIZE - 8) * 1.4,
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
    fontSize: CELL_SIZE * 0.2,
    color: "#fff",
    fontWeight: "bold"
  },
  powerText: {
    fontSize: CELL_SIZE * 0.15,
    color: "#fff",
    marginTop: 4,
  },
  cardSide: {
    width: CELL_SIZE - 8,
    height: (CELL_SIZE - 8) * 1.4,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  }
});
