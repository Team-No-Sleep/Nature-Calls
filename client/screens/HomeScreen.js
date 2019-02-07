import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Modal,
  Alert
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { WebBrowser, AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
import { NavigationActions } from "react-navigation";
import API from "../utils/API";
import { GameEngine, DefaultTouchProcessor } from "react-native-game-engine";

import Game from "../components/game";
import Lobby from "../components/lobby";
import ChoosePlayer from "../components/choosePlayer";
import Leaderboard from "../components/leaderboard";



import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    user: null,
    gameVisible: false,
    leaderboardVisible: false,
    choosePlayerVisible: false
    
  } 

  toggleGame = gameVisible => {
    this.setState({
      gameVisible: gameVisible,
      choosePlayerVisible: !gameVisible
    });
  };

  toggleLeaderboard = leaderboardVisible => {
    this.setState({
      leaderboardVisible
    })
  }

  toggleChoosePlayer = choosePlayerVisible => {
    this.setState({
      choosePlayerVisible
    })
  }

  toggleLobby = lobbyVisible => {
    this.setState({
      lobbyVisible
    })
  }



  // componentDidMount() {
  //   console.log(this.props.navigation.state.params.data.user);
  //   const user = this.props.navigation.state.params.data.user;
  //   //this.props.navigation.setParams({ user });
  //   const navigateAction = NavigationActions.setParams({
  //     key: "id-1547683730508-2",
  //     params: { user: user }
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  //   console.log("params set");
  //   //this.props.navigation.goBack();
  // }
  goHome = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "Auth"
    });
    this.props.navigation.dispatch(navigateAction);
    //this.props.navigation.goBack();
  }
  logout = () => {
    console.log ("logout press");
    API.logout()
    .then(res => this.goHome())
    .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

  {/* Lobby component or main menu? 
        Maybe in the Lobby you can have the log in, log out, register features.*/}
      <Lobby 
          onPlayGame={_ => this.toggleChoosePlayer(true)}
          onLeaderBoard={_ => this.toggleLeaderboard(true)}
          containerStyle={styles.container}
          onLogOut={_ => this.logout()}

       />

       < ChoosePlayer
          onPlayGame={_ => this.toggleGame(true)}
          onLeaderBoard={_ => this.toggleLeaderboard(true)}
          containerStyle={styles.container}
          visible={this.state.choosePlayerVisible}
          onLogOut={_ => this.logout()}
       />



      <Game
          visible={this.state.gameVisible}
          onClose={_ => this.toggleGame(false)} 
          containerStyle={styles.container}    
      />

      <Leaderboard
       visible={this.state.leaderboardVisible}
       onClose={_ => this.toggleGame(false)} 
       containerStyle={styles.container} 
      />




      </View>
    );
  }









  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
