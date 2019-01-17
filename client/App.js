import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import React, { PureComponent } from "react";
import { StyleSheet, Modal, Alert } from "react-native";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
import LevelOne from "./entities/level-1";
import Systems from "./systems";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
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
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        </View>
      );
    }


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
