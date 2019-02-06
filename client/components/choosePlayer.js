import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, Image } from "react-native";

import { Container, Header, Content, Button, Text } from 'native-base';




export default class ChoosePlayer extends PureComponent {
    render() {
        state = {
            borderStyle: style = { borderWidth: 5, borderColor: "red", borderRadius: 15 }
        }
        return (
            <Modal
                transparent={false}
                animationType="fade"
                visible={this.props.visible}
                onRequestClose={this.quit}
                supportedOrientations={['landscape']}
            >
                <ImageBackground style={this.props.containerStyle} source={require("../assets/backgrounds/landJungle.gif")}>
                    <View style={styles.buttonView}>
                        <Button rounded success style={styles.button} onPress={this.props.onPlayGame}>
                            <Text>Ready Up</Text>
                        </Button>

                        <Button rounded success style={styles.button} onPress={this.props.onLeaderBoard}>
                            <Text>Leaderboard</Text>
                        </Button>
                    </View>

                    <View style={styles.ChoosePlayerText}><Text h1>Choose Player</Text></View>

                    <View style={styles.dinoView}>

                        <Image source={require("../assets/images/idlingDinoRed.gif")} onPress={this.setState.borderStyle} />

                        <Image source={require("../assets/images/idlingDinoGreen.gif")} />
                    </View>

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
        // top: 180,
        // left: 450,
        // margin: 10,
        width: 130,

    },
    container: {
        flex: 1,
    },

    dinoView: {
        flexDirection: 'row',
        marginLeft: "25%",
        marginTop: "5%"
    },

    buttonView: {
        marginTop: "5%",
        flexDirection: 'row',
        marginLeft: "30%",
    },

    ChoosePlayerText: {
        flexDirection: 'row',
        marginLeft: "40%"
    },

    redDino: {
        borderWidth: 5,
        borderColor: "red",
        borderRadius: 15
    }
});