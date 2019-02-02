import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground,View, StatusBar } from "react-native";

import { Container, Header, Content, Button, Text } from 'native-base';


export default class Lobby extends PureComponent {


    render() {
        return(
            <ImageBackground style={this.props.containerStyle} source={require("../assets/images/nature_calls_loading.png")}>

            <Button rounded success style={styles.button} onPress={this.props.onPlayGame}>
                <Text>Play Game</Text>
            </Button>

            <Button rounded success style={styles.button} onPress={this.props.onLeaderBoard}>
                <Text>Leaderboard</Text>
            </Button>

            </ImageBackground>

        )
    }
    };

          

    const styles = StyleSheet.create({

        button: {
                justifyContent: "center",
                alignSelf: "stretch",
                textAlignVertical: "center",
                color: "#006400",
                backgroundColor: "#006400",
                position: "relative",
                top: 180,
                left: 450,
                margin: 10,
                width: 130,

        },
        
    

    });