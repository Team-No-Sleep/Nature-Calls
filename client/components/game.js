import React, { PureComponent } from "react";
import { StyleSheet, Modal, Alert, ImageBackground } from "react-native";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import LevelOne from "../entities/level-1";
import Systems from "../systems";
import GameOver from "../components/gameOver";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.playerDataFromServer = {
      tp: ""
    };
    this.state = {
      //player: "player1",
      running: false,
      gameOver: false,
      player1Win: false,
      //player1: true
    };
  }
  componentDidMount() {
   
    this.props.socket.on("position" , data => {
      //console.log(data);
      if(this.state.running){
        this.playerDataFromServer[data.dino] = data;
      }
      // this.setState ({
      //   player: data.user
      // })
    });

    this.props.socket.on("tp-status-change", data => {
      if(this.state.running){
        this.playerDataFromServer["tp"] = data;
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
      this.props.socket.emit("gameOver");
    }, 1000);
  };


  render() {
    return (
      <Modal
        transparent={false}
        animationType="none"
        visible={this.props.visible}
        onRequestClose={this.quit}
      >

        <ImageBackground style={styles.container} source={require("../assets/backgrounds/jungle.gif")}>

          <GameEngine
            ref={"engine"}
            // style={styles.game}
            systems={Systems(this.playerDataFromServer, this.props.socket, this.props.user)}
            entities={LevelOne(null, this.props.selectedDino)}
            //entities={LevelOne(null, this.state.player1)}
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
