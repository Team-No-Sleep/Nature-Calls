import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Text, Modal, Alert } from 'react-native';
import SocketIOClient from 'socket.io-client'
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import LevelOne from "./entities/level-1";
import Systems from "./systems";
//import Orientation from 'react-native-orientation-locker';


export default class App extends React.Component {
  
  state = {
    isLoadingComplete: true,
    guestLogin: true
  };

  constructor() {
    super();
    
    this.socket = SocketIOClient('http://localhost:3001');
    
 }

// constructor(props) {
//   super(props);
//   this.socket = SocketIOClient('https://nature-calls.herokuapp.com/'); // replace 'environment.serverUrl' with your server url
//   this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
  
//   // Listens to channel2 and display the data recieved
//   this.socket.on('channel2', (data) => {
//       console.log('Data recieved from server', data); //this will console 'channel 2'
//     });
//   }

clicked = () => {
  
  const dataObj = {
    action: 'click'
  };
  
  this.socket.emit('channel2', dataObj);
}

  // componentDidMount() {
  //   console.log(Orientation);
  //   //Orientation.lockToLandscapeLeft();

  // }

  render() {

    
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        //TODO: 
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        
        <View >
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          
              <AppNavigator />

              <Modal
                transparent={false}
                animationType="slide"
                visible={this.props.visible}
                onRequestClose={this.quit}
                >
                <ImageBackground style = {styles.container} source = {require("./assets/backgrounds/jungle.gif")}>
                  <GameEngine
                    ref={"engine"}
                    // style={styles.game}
                    systems={Systems}
                    entities={LevelOne()}
                    touchProcessor={DefaultTouchProcessor({
                      triggerPressEventBefore: 150,
                      triggerLongPressEventAfter: 151
                    })}
                    running={this.state.isLoadingComplete}
                    onEvent={this.handleEvent}
                    >
                  </GameEngine>
                </ImageBackground>
              </Modal>
            </View>
        
      );
    }
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    }

  
});
