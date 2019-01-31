import React, { PureComponent } from "react";
import { StyleSheet, Modal, Alert, ImageBackground } from "react-native";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import LevelOne from "../entities/level-1";
import Systems from "../systems";


export default class Game extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        running: false,
        gameOver: false,
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.visible) {
        this.setState({
          running: true
        });
      }
    }
  
    restart = () => {
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
  
    gameOver = () => {
      this.setState({
        running: false
      });
  
      //-- Let the player wallow in their failure for a second or two..
      setTimeout(() => {
        this.setState({
          gameOver: true
        });
      }, 1000);
    };
  
  
    // handleEvent = ev => {
    //   switch (ev.type) {
    //     case "game-over":
    //       this.gameOver();
    //       break;
    //     case "princess-rescued":
    //       this.princessRescued();
    //       break;
    //   }
    // };
  
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
            systems={Systems}
            entities={LevelOne()}
            touchProcessor={DefaultTouchProcessor({
              triggerPressEventBefore: 150,
              triggerLongPressEventAfter: 151
            })}
            running={this.state.running}
            onEvent={this.handleEvent}
          >
            {this.state.gameOver && (
              <GameOver onPlayAgain={this.restart} onQuit={this.quit} />
            )}
{/*   
            {this.state.princessRescued && (
              <PrincessRescued onPlayAgain={this.restart} onQuit={this.quit} />
            )} */}
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
  