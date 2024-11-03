import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated, Image } from 'react-native';
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
  const hoverAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (cell.isRevealed) {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [cell.isRevealed]);

  useEffect(() => {
    if (isSelected && cell.isRevealed) {
      Animated.parallel([
        Animated.spring(hoverAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(hoverAnim, {
          toValue: 0,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isSelected]);

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

  const translateY = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const containerStyle = {
    transform: [
      { translateY },
      { scale: scaleAnim }
    ]
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
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
            <>
              <Image 
                source={cell.animal.type === "dragon" 
                  ? require('@/assets/images/dragons/dragon-border.png')  // 替换为实际的龙边框图片路径
                  : require('@/assets/images/tigers/tiger-border.png')   // 替换为实际的虎边框图片路径
                }
                style={styles.borderImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cellText}>{cell.animal.name}</Text>
                <Text style={styles.powerText}>{cell.animal.id}</Text>
              </View>
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE,
    height: CELL_SIZE * 1.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: CELL_SIZE - 8,
    height: (CELL_SIZE - 8) * 1.4,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedCell: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    zIndex: 1  // 确保内容显示在边框图片上方
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
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)'
  },
  borderImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
