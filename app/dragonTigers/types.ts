export type Animal = {
    id: number;
    name: string;
    power: number;
    canBeEatenBy: number[];
    color?: string;
  };
  
  export type Cell = {
    animal: Animal | null;
    isRevealed: boolean;
    color: string | null;
    owner: number | null;
  };
  
  export type Board = Cell[][];
  
  export type GameState = {
    board: Board;
    currentPlayer: number;
    selectedPiece: { row: number; col: number } | null;
    player1Color: string;
    player2Color: string;
    gameStarted: boolean;
  };
  
  export type Position = {
    row: number;
    col: number;
  };
