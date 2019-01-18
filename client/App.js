import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Modal, Alert } from 'react-native';
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

       

        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        
          <AppNavigator />

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
              running={this.state.isLoadingComplete}
              onEvent={this.handleEvent}
              >
            </GameEngine>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  }
});
