import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Player = ({ position }) => {
  return (
    <View style={[styles.player, { left: position.x, top: position.y }]} />
  );
};

const Obstacle = ({ position }) => {
  return (
    <View style={[styles.obstacle, { left: position.x, top: position.y }]} />
  );
};

const MovePlayer = (entities, { touches }) => {
  touches.filter(t => t.type === "move").forEach(t => {
    let player = entities["player"];
    player.position.x = Math.max(Math.min(t.event.pageX, WIDTH - 30), 0);
  });
  return entities;
};

const MoveObstacles = (entities, { time }) => {
  let obstacle = entities["obstacle"];
  obstacle.position.y += 5;
  if (obstacle.position.y > HEIGHT) {
    obstacle.position.y = 0;
    obstacle.position.x = Math.random() * (WIDTH - 30);
  }
  return entities;
};

const CheckCollisions = (entities) => {
  let player = entities["player"];
  let obstacle = entities["obstacle"];
  if (
    player.position.x < obstacle.position.x + 30 &&
    player.position.x + 30 > obstacle.position.x &&
    player.position.y < obstacle.position.y + 30 &&
    player.position.y + 30 > obstacle.position.y
  ) {
    console.log("Game Over!");
  }
  return entities;
};

class SimpleGame extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: true
    };
    this.gameEngine = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={[MovePlayer, MoveObstacles, CheckCollisions]}
          entities={{
            player: { position: { x: WIDTH / 2 - 15, y: HEIGHT - 60 }, renderer: <Player /> },
            obstacle: { position: { x: WIDTH / 2 - 15, y: 0 }, renderer: <Obstacle /> }
          }}>
          <Text style={styles.gameOverText}>Simple Game</Text>
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  player: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: 'blue',
  },
  obstacle: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
});

export default SimpleGame;
