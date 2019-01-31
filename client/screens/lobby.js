import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, Button, View, StatusBar } from "react-native";



export default class Lobby extends PureComponent {


    render() {
        return(
            <View style={this.props.containerStyle}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <ImageBackground style={this.props.containerStyle} source={require("../assets/images/nature_calls_loading.png")}>

                <Button title={"Play Game"} onPress={this.props.onPlayGame}></Button>

            </ImageBackground>
            </View>

        )
    }
    };

          