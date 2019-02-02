import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Text, Modal, Alert } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
// import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";
// import LevelOne from "./entities/level-1";
// import Systems from "./systems";
//import Orientation from 'react-native-orientation-locker';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class App extends React.Component {
  state = {
    //isLoadingComplete: true,
    isLoadingComplete: false,
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

        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>

      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
    ]);
  }
  _handleLoadingError = error => {
    //In this case, you migh want to report the error to your error reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
