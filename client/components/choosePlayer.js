import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar } from "react-native";

import { Container, Header, Content, Button, Text } from 'native-base';


export default class ChoosePlayer extends PureComponent {


    render() {
        return(
            <Modal
          transparent={false}
          animationType="fade"
          visible={this.props.visible}
          onRequestClose={this.quit}
          supportedOrientations={['portrait', 'landscape']}
            >
                <ImageBackground style={this.props.containerStyle} source={require("../assets/backgrounds/userLogin-1.png")}>

                <Button rounded success style={styles.button} onPress={this.props.onPlayGame}>
                    <Text>Ready Up</Text>
                </Button>

                <Button rounded success style={styles.button} onPress={this.props.onLeaderBoard}>
                    <Text>Jump</Text>
                </Button>

                </ImageBackground>
            </Modal>

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
        container: {
            flex: 1,
          }
    });