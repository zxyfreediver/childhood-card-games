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
        style={[styles.cell]}
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
                <View style={styles.topRow}>
                  <Text style={styles.idText}>{cell.animal.id}</Text>
                  <Text style={styles.nameText}>{cell.animal.name}</Text>
                </View>
                <Image 
                  source={cell.animal.avatar} 
                  style={[styles.avatar, {
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    resizeMode: 'contain'
                  }]} 
                />
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
  cardSide: {
    width: CELL_SIZE - 8,
    height: (CELL_SIZE - 8) * 1.4,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: 'hidden',
  },
  borderImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 2,
  },
  idText: {
    fontSize: CELL_SIZE * 0.15,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 2,
  },
  nameText: {
    fontSize: CELL_SIZE * 0.18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 2,
  },
  avatar: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -CELL_SIZE * 0.5 },
      { translateY: -CELL_SIZE * 0.5 }
    ],
    width: CELL_SIZE,
    height: CELL_SIZE,
    resizeMode: 'contain',
    zIndex: 1,
  }
});
