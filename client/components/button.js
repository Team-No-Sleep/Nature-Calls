import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressIn = () => {
    this.refs.buttonContainer.transitionTo({
      opacity: 0.7,
      transform: [{ scale: 0.95 }]
    });
  };

  onPressOut = e => {
    this.refs.buttonContainer.transitionTo({
      opacity: 1,
      transform: [{ scale: 1 }]
    });
    console.log(this.props.onPress)
    if (this.props.onPress) this.props.onPress();

  };

  onPress = e => {
      console.log("hi")
  };

  render() {
    return (
        <Animatable.View useNativeDriver style={[styles1.buttonContainer, this.props.style]} ref={"buttonContainer"}>
          <TouchableOpacity
            style={styles1.textContainer}
            activeOpacity={1}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}
            onPress={this.onPress}
          >
            <Animatable.Text style={[styles1.text, this.props.theme]}>
              {this.props.children}
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
    );
  }
}

const styles1 = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "green",
        borderRadius: 11,
        flexDirection: "row",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
        
      },
      textContainer: {
        backgroundColor: "transparent",
        flex: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
      },
      text: {
        fontSize: 20,
        color: "white",
        textShadowOffset: { width: 0, height: 1 },
        textShadowColor: "black",
        textShadowRadius: 2,
      }

})


