import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// 计算合适的棋盘大小，取屏幕宽度和高度的较小值的85%
export const WIDTH = Math.min(screenWidth, screenHeight) * 0.85;
// 根据棋盘大小和格子数计算单个格子大小
export const CELL_SIZE = (WIDTH - 40) / 4; // 40是总的边距空间

export const DRAGONS = {
  1: { id: 1, name: "龙王", power: 8, canBeEatenBy: [8], type: 'dragon' },
  2: { id: 2, name: "神龙", power: 7, canBeEatenBy: [1], type: 'dragon' },
  3: { id: 3, name: "金龙", power: 6, canBeEatenBy: [1, 2], type: 'dragon' },
  4: { id: 4, name: "青龙", power: 5, canBeEatenBy: [1, 2, 3], type: 'dragon' },
  5: { id: 5, name: "赤龙", power: 4, canBeEatenBy: [1, 2, 3, 4], type: 'dragon' },
  6: { id: 6, name: "白龙", power: 3, canBeEatenBy: [1, 2, 3, 4, 5], type: 'dragon' },
  7: { id: 7, name: "风雨龙", power: 2, canBeEatenBy: [1, 2, 3, 4, 5, 6], type: 'dragon' },
  8: { id: 8, name: "变形龙", power: 1, canBeEatenBy: [2, 3, 4, 5, 6, 7], type: 'dragon' }
};

export const TIGERS = {
  1: { id: 1, name: "虎王", power: 8, canBeEatenBy: [8], type: 'tiger' },
  2: { id: 2, name: "东北虎", power: 7, canBeEatenBy: [1], type: 'tiger' },
  3: { id: 3, name: "大头虎", power: 6, canBeEatenBy: [1, 2], type: 'tiger' },
  4: { id: 4, name: "下山虎", power: 5, canBeEatenBy: [1, 2, 3], type: 'tiger' },
  5: { id: 5, name: "绿虎", power: 4, canBeEatenBy: [1, 2, 3, 4], type: 'tiger' },
  6: { id: 6, name: "妖虎", power: 3, canBeEatenBy: [1, 2, 3, 4, 5], type: 'tiger' },
  7: { id: 7, name: "白虎", power: 2, canBeEatenBy: [1, 2, 3, 4, 5, 6], type: 'tiger' },
  8: { id: 8, name: "小王虎", power: 1, canBeEatenBy: [2, 3, 4, 5, 6, 7], type: 'tiger' }
};

export const BOARD_SIZE = 4;

export const PLAYER_COLORS = {
  PLAYER1: 'red',
  PLAYER2: 'blue'
} as const;
