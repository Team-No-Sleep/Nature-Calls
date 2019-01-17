import React, { PureComponent } from "react";
import { StyleSheet, Modal, Alert } from "react-native";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import LevelOne from "./entities/level-1";
import Systems from "./systems";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
      gameOver: false,
    };
  }


  render() {
    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.quit}
      >
        <GameEngine
          ref={"engine"}
          // style={styles.game}
          systems={Systems}
          entities={LevelOne()}
          touchProcessor={DefaultTouchProcessor({
            triggerPressEventBefore: 150,
            triggerLongPressEventAfter: 151
          })}
          running={this.state.running}
          onEvent={this.handleEvent}
        >
        </GameEngine>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  }
});
