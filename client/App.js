import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Text, Modal, Alert } from 'react-native';
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
