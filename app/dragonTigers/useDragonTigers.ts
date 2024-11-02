import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { GameState, Position, Cell } from './types';
import { DRAGONS, TIGERS, PLAYER_COLORS } from './gameConfig';

const getInitialState = (): GameState => ({
  board: initializeBoard(),
  currentPlayer: 1,
  selectedPiece: null,
  player1Color: PLAYER_COLORS.PLAYER1,
  player2Color: PLAYER_COLORS.PLAYER2,
  gameStarted: false
});

const initializeBoard = () => {
  const redAnimals = Object.values(TIGERS).map(animal => ({...animal, color: PLAYER_COLORS.PLAYER1}));
  const blueAnimals = Object.values(DRAGONS).map(animal => ({...animal, color: PLAYER_COLORS.PLAYER2}));
  const animals = [...redAnimals, ...blueAnimals];
  const shuffled = animals.sort(() => Math.random() - 0.5);
  
  const board = Array(4).fill(null).map(() => 
    Array(4).fill(null).map(() => ({
      animal: null,
      isRevealed: false,
      color: null,
      owner: null
    }))
  );
  
  let index = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board[i][j].animal = shuffled[index++];
    }
  }
  
  return board;
};

export const useDragonTiger = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState());

  const canEat = useCallback((attacker: Cell, defender: Cell): boolean => {
    if (!attacker?.animal || !defender?.animal) return false;
    
    if (attacker.animal.id === defender.animal.id) return true;
    if (attacker.animal.id === 8 && defender.animal.id === 1) return true;
    
    return defender.animal.canBeEatenBy.includes(attacker.animal.id);
  }, []);

  const canMove = useCallback((from: Position, to: Position): boolean => {
    const { board } = gameState;
    const targetCell = board[to.row][to.col];

    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    const isOneStep = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);

    if (!targetCell.isRevealed) return false;
    if (targetCell.isRevealed && targetCell.animal) return isOneStep;
    if (targetCell.isRevealed && !targetCell.animal) return isOneStep;

    return false;
  }, [gameState.board]);

  const handleCellPress = useCallback((row: number, col: number) => {
    const { board, currentPlayer, selectedPiece } = gameState;
    const cell = board[row][col];

    if (!selectedPiece) {
      if (!cell.isRevealed) {
        const newBoard = [...board];
        newBoard[row][col] = {
          ...cell,
          isRevealed: true,
          color: cell.animal!.color,
          owner: cell.animal!.color === PLAYER_COLORS.PLAYER1 ? 1 : 2
        };
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: currentPlayer === 1 ? 2 : 1
        }));
      } 
      else if (cell.isRevealed && cell.owner === currentPlayer) {
        setGameState(prev => ({ ...prev, selectedPiece: { row, col } }));
      }
    } 
    else {
      const selectedCell = board[selectedPiece.row][selectedPiece.col];
      
      if (canMove(selectedPiece, { row, col })) {
        if (cell.isRevealed && cell.animal && cell.owner !== currentPlayer && 
            canEat(selectedCell, cell)) {
          const newBoard = [...board];
          
          if (selectedCell.animal!.id === cell.animal!.id) {
            newBoard[row][col] = {
              animal: null,
              isRevealed: true,
              color: null,
              owner: null
            };
            newBoard[selectedPiece.row][selectedPiece.col] = {
              animal: null,
              isRevealed: true,
              color: null,
              owner: null
            };
          } else {
            newBoard[row][col] = selectedCell;
            newBoard[selectedPiece.row][selectedPiece.col] = {
              animal: null,
              isRevealed: true,
              color: null,
              owner: null
            };
          }
          
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            selectedPiece: null,
            currentPlayer: currentPlayer === 1 ? 2 : 1
          }));
        }
        else if (cell.isRevealed && !cell.animal) {
          const newBoard = [...board];
          newBoard[row][col] = selectedCell;
          newBoard[selectedPiece.row][selectedPiece.col] = {
            animal: null,
            isRevealed: true,
            color: null,
            owner: null
          };
          
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            selectedPiece: null,
            currentPlayer: currentPlayer === 1 ? 2 : 1
          }));
        }
      }
      
      setGameState(prev => ({ ...prev, selectedPiece: null }));
    }
  }, [gameState, canEat, canMove]);

  const resetGame = useCallback(() => {
    Alert.alert(
      "重新开始",
      "确定要重新开始游戏吗？",
      [
        { text: "取消", style: "cancel" },
        { text: "确定", onPress: () => setGameState(getInitialState()) }
      ]
    );
  }, []);

  return {
    gameState,
    handleCellPress,
    resetGame
  };
};
