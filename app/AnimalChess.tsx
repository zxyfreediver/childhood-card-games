import React, { PureComponent } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  Image
} from "react-native";

const { width: WIDTH } = Dimensions.get("window");
const CELL_SIZE = WIDTH / 4;

// 龙队中依次是龙王神龙金龙青龙赤龙白龙风雨龙变形龙
// 虎队中依次是虎王东北虎大头虎下山虎绿虎妖虎白虎小王虎

const DRAGONS = {
    1: { id: 1, name: "龙王", power: 8, canBeEatenBy: [8] },
    2: { id: 2, name: "神龙", power: 7, canBeEatenBy: [1] },
    3: { id: 3, name: "金龙", power: 6, canBeEatenBy: [1, 2] },
    4: { id: 4, name: "青龙", power: 5, canBeEatenBy: [1, 2, 3] },
    5: { id: 5, name: "赤龙", power: 4, canBeEatenBy: [1, 2, 3, 4] },
    6: { id: 6, name: "白龙", power: 3, canBeEatenBy: [1, 2, 3, 4, 5] },
    7: { id: 7, name: "风雨龙", power: 2, canBeEatenBy: [1, 2, 3, 4, 5, 6] },
    8: { id: 8, name: "变形龙", power: 1, canBeEatenBy: [2, 3, 4, 5, 6, 7] }
}

const TIGERS = {
    1: { id: 1, name: "虎王", power: 8, canBeEatenBy: [8] },
    2: { id: 2, name: "东北虎", power: 7, canBeEatenBy: [1] },
    3: { id: 3, name: "大头虎", power: 6, canBeEatenBy: [1, 2] },
    4: { id: 4, name: "下山虎", power: 5, canBeEatenBy: [1, 2, 3] },
    5: { id: 5, name: "绿虎", power: 4, canBeEatenBy: [1, 2, 3, 4] },
    6: { id: 6, name: "妖虎", power: 3, canBeEatenBy: [1, 2, 3, 4, 5] },
    7: { id: 7, name: "白虎", power: 2, canBeEatenBy: [1, 2, 3, 4, 5, 6] },
    8: { id: 8, name: "小王虎", power: 1, canBeEatenBy: [2, 3, 4, 5, 6, 7] }
}

// 添加一个按钮组件
const Button = ({ onPress, title, style }) => (
  <TouchableOpacity 
    style={[styles.button, style]} 
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// 使用图片的卡牌背面组件
const CardBack = () => (
  <Image
    source={require('../assets/images/react-logo.png')} // 需要添加对应的图片资源
    style={styles.cardBackImage}
  />
);

class AnimalChess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  // 将初始状态抽取为一个方法，方便重置游戏
  getInitialState() {
    return {
      board: this.initializeBoard(),
      currentPlayer: 1,
      selectedPiece: null,
      player1Color: "red",
      player2Color: "blue",
      gameStarted: false
    };
  }

  // 重置游戏
  resetGame = () => {
    Alert.alert(
      "重新开始",
      "确定要重新开始游戏吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "确定",
          onPress: () => this.setState(this.getInitialState())
        }
      ]
    );
  }

  initializeBoard() {
    // 创建包含所有动物的数组,并标记颜色
    const redAnimals = Object.values(TIGERS).map(animal => ({...animal, color: 'red'}));
    const blueAnimals = Object.values(DRAGONS).map(animal => ({...animal, color: 'blue'}));
    const animals = [...redAnimals, ...blueAnimals];
    // 随机打乱数组
    const shuffled = animals.sort(() => Math.random() - 0.5);
    
    // 创建4x4的棋盘
    const board = Array(4).fill().map(() => Array(4).fill(null));
    let index = 0;
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board[i][j] = {
          animal: shuffled[index++],
          isRevealed: false,
          color: null
        };
      }
    }
    
    return board;
  }

  // 修改吃子规则
  canEat(attacker, defender) {
    if (!attacker || !defender) return false;
    
    // 相同动物互吃
    if (attacker.animal.id === defender.animal.id) {
      return true;
    }
    
    // 特殊规则：老鼠可以吃大象
    if (attacker.animal.id === 8 && defender.animal.id === 1) {
      return true;
    }
    
    // 检查普通吃子规则
    return defender.animal.canBeEatenBy.includes(attacker.animal.id);
  }

  // 检查是否可以移动到目标位置
  canMove(fromRow, fromCol, toRow, toCol) {
    const { board } = this.state;
    const targetCell = board[toRow][toCol];

    // 只能上下左右移动一格
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    const isOneStep = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);

    // 如果目标格子未翻开，不能移动到该位置
    if (!targetCell.isRevealed) {
      return false;
    }

    // 如果目标格子已翻开但还有棋子（未被吃），不能移动到该位置
    if (targetCell.isRevealed && targetCell.animal) {
      return isOneStep; // 只有在可能吃子的情况下才返回true
    }

    // 如果目标格子已翻开且没有棋子（被吃掉的空格），可以移动
    if (targetCell.isRevealed && !targetCell.animal) {
      return isOneStep;
    }

    return false;
  }

  handleCellPress = (row, col) => {
    const { board, currentPlayer, selectedPiece } = this.state;
    const cell = board[row][col];

    // 如果没有选中棋子
    if (!selectedPiece) {
      // 如果格子还未翻开
      if (!cell.isRevealed) {
        const newBoard = [...board];
        newBoard[row][col] = {
          ...cell,
          isRevealed: true,
          color: cell.animal.color, // 使用卡牌本身的颜色
          owner: cell.animal.color === 'red' ? 1 : 2 // 根据颜色判断所有者
        };
        
        this.setState({
          board: newBoard,
          currentPlayer: currentPlayer === 1 ? 2 : 1
        });
      } 
      // 如果格子已经翻开且是当前玩家的棋子
      else if (cell.isRevealed && cell.owner === currentPlayer) {
        this.setState({ selectedPiece: { row, col } });
      }
    } 
    // 如果已经选中了棋子
    else {
      const selectedCell = board[selectedPiece.row][selectedPiece.col];
      
      // 检查是否是有效的移动
      if (this.canMove(selectedPiece.row, selectedPiece.col, row, col)) {
        // 如果目标位置有对方的棋子且可以吃子
        if (cell.isRevealed && cell.animal && cell.owner !== currentPlayer && 
            this.canEat(selectedCell, cell)) {
          const newBoard = [...board];
          
          if (selectedCell.animal.id === cell.animal.id) {
            // 如果是相同的动物，两个都消失
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
            // 普通吃子规则，移动棋子并吃掉对方的棋子
            newBoard[row][col] = selectedCell;
            newBoard[selectedPiece.row][selectedPiece.col] = {
              animal: null,
              isRevealed: true,
              color: null,
              owner: null
            };
          }
          
          this.setState({
            board: newBoard,
            selectedPiece: null,
            currentPlayer: currentPlayer === 1 ? 2 : 1
          });
        }
        // 如果目标位置是空的已翻开格子（被吃掉的位置）
        else if (cell.isRevealed && !cell.animal) {
          const newBoard = [...board];
          // 移动棋子
          newBoard[row][col] = selectedCell;
          newBoard[selectedPiece.row][selectedPiece.col] = {
            animal: null,
            isRevealed: true,
            color: null,
            owner: null
          };
          
          this.setState({
            board: newBoard,
            selectedPiece: null,
            currentPlayer: currentPlayer === 1 ? 2 : 1
          });
        }
      }
      
      // 取消选中
      this.setState({ selectedPiece: null });
    }
  }

  render() {
    const { currentPlayer, selectedPiece } = this.state;
    
    return (
      <View style={styles.container}>
        <Text style={[styles.turnText]}>
          {`玩家 ${currentPlayer} 回合`}
        </Text>
        <View style={styles.board}>
          {this.state.board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    cell.isRevealed && cell.color && { backgroundColor: cell.color },
                    selectedPiece && 
                    selectedPiece.row === rowIndex && 
                    selectedPiece.col === colIndex && 
                    styles.selectedCell
                  ]}
                  onPress={() => this.handleCellPress(rowIndex, colIndex)}
                >
                  {!cell.isRevealed ? (
                    <CardBack />
                  ) : (
                    cell.animal && (
                      <View style={styles.cardContent}>
                        <Text style={styles.cellText}>{cell.animal.name}</Text>
                        <Text style={styles.ownerText}>
                          {cell.animal.id}
                        </Text>
                      </View>
                    )
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.playerInfo}>
            <View style={[styles.colorIndicator, { backgroundColor: this.state.player1Color }]} />
            <Text style={styles.playerText}>玩家 1</Text>
          </View>
          <Button 
            title="重新开始" 
            onPress={this.resetGame}
            style={styles.resetButton}
          />
          <View style={styles.playerInfo}>
            <View style={[styles.colorIndicator, { backgroundColor: this.state.player2Color }]} />
            <Text style={styles.playerText}>玩家 2</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  turnText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  board: {
    width: WIDTH,
    height: WIDTH,
    backgroundColor: "#eee"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20
  },
  row: {
    flexDirection: "row"
  },
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
  cellText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  resetButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 30,
    paddingVertical: 12
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },
  playerText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  selectedCell: {
    borderWidth: 3,
    borderColor: "#FFD700",
    elevation: 5
  },
  cardBack: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardPattern: {
    width: '60%',
    height: '60%',
    justifyContent: 'space-between',
  },
  patternRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patternDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
  },
  cardBackImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});

export default AnimalChess; 
