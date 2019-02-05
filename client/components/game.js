import React, { PureComponent } from "react";
import { StyleSheet, Modal, Alert, ImageBackground } from "react-native";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import SocketIOClient from 'socket.io-client';
import LevelOne from "../entities/level-1";
import Systems from "../systems";
import GameOver from "../components/gameOver";


export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.socket = null;
    this.playerDataFromServer = {};
    this.state = {
      running: false,
      gameOver: false,
      player1Win: false
    };
  }
  componentDidMount() {
    this.socket = SocketIOClient("http://localhost:3001");
    this.socket.on("position" , data => {
      if(this.state.running){
        this.playerDataFromServer[data.position.dino] = data.position;
      }
    });

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        running: true
      });
    }
  }

  restart = () => {
    console.log("restarting")
    this.refs.engine.swap(LevelOne());

    this.setState({
      running: true,
      gameOver: false,
      princessRescued: false
    });
  };

  quit = () => {
    this.setState({
      running: false,
      gameOver: false,
      princessRescued: false
    });

    if (this.props.onClose) this.props.onClose();
  };

  handleEvent = ev => {
    switch (ev.type) {
      case "dino1-wins":
        this.gameOver(1);
        break;
      case "dino2-wins":
        this.gameOver(2);
        break;
    }
  };

  gameOver = (player) => {
    console.log("game Over")
    let player1Win = (player === 1);
    this.setState({
      running: false,
      gameOver: true,
      player1Win: player1Win

    });

    //-- Let the player wallow in their failure for a second or two..
    setTimeout(() => {
      this.setState({
        gameOver: true
      });
    }, 1000);
  };


  render() {
    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.quit}
      >

        <ImageBackground style={styles.container} source={require("../assets/backgrounds/jungle.gif")}>

          <GameEngine
            ref={"engine"}
            // style={styles.game}
            systems={Systems(this.playerDataFromServer)}
            entities={LevelOne()}
            touchProcessor={DefaultTouchProcessor({
              triggerPressEventBefore: 150,
              triggerLongPressEventAfter: 151
            })}
            running={this.state.running}
            onEvent={this.handleEvent}
          >
            {this.state.gameOver && (
              <GameOver onPlayAgain={this.restart} onQuit={this.quit} playerOneWon={this.state.player1Win} />
            )}

          </GameEngine>

        </ImageBackground>

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  },
  container: {
    flex: 1,
  }
});
