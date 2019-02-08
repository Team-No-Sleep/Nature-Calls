import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, Image, TouchableOpacity } from "react-native";

import { Container, Header, Content, Button, Text, Icon, Fab } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';


export default class ChoosePlayer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dino1Pressed: false,
            dino2Pressed: false,
            dinoTaken: null
        }
    }
    componentDidMount() {
        this.props.socket.on("dinoSelected", (dinoTaken) => {
            console.log("dinoSelected", dinoTaken);
            if (dinoTaken.user === this.props.user.local.username) {
                //ignore event about our selection
                return;
            }
            let newState = {
                dinoTaken: dinoTaken
            };
            if (dinoTaken.dino === "mario") {
                newState["dino1Pressed"] = false;
            }
            if (dinoTaken.dino === "dino2") {
                newState["dino2Pressed"] = false;
            }
            this.setState(newState);
        });
        this.props.socket.emit("registerPlayer", { user: this.props.user }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Your session is: ", data);
                this.setState({ dinoTaken: data.dinoTaken });
            }
        });
    }

    dinoPressed = (dino) => {
        this.props.socket.emit("selectDino", { dino: dino, user: this.props.user }, (success) => {
            if (!success) {
                return;
            }
            if (dino === "mario") {
                this.setState({ dino1Pressed: true, dino2Pressed: false });
            } else if (dino === "dino2") {
                this.setState({ dino2Pressed: true, dino1Pressed: false });
            }
            this.props.selectDino(dino);
        });
    }

    render() {

        console.log("state");
        console.log(this.state);
        console.log(this.props.user);
        let marioDisabled = false;
        let dino2Disabled = false;
        let marioPlayerName = "Choose Player";
        let dino2PlayerName = "Choose Player";
        if (this.state.dinoTaken) {
            if (this.state.dinoTaken.dino === "mario") {
                marioDisabled = true;
                marioPlayerName = this.state.dinoTaken.user;
            } else if (this.state.dinoTaken.dino === "dino2") {
                dino2Disabled = true;
                dino2PlayerName = this.state.dinoTaken.user;
            }
        }
        if (this.state.dino1Pressed === true) {
            marioPlayerName = this.props.user.local.username;
        } else if (this.state.dino2Pressed === true) {
            dino2PlayerName = this.props.user.local.username;
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
                        {/* This should be a leaderboard button no a go back button */}
                        <Button rounded success style={styles.button} onPress={this.props.onLeaderBoard}>
                            <Text>Go Back</Text> 
                        </Button>

                        <Button rounded success style={styles.button} onPress={this.props.onLogOut}>
                            <Text>Log Out</Text>
                        </Button>
                    </View>

                    <View style={styles.ChoosePlayerText}>
                        <Text h1 style={{ color: "black", fontWeight: "bold", marginRight: "7%" }}>{marioPlayerName}</Text>
                        <Text h1 style={{ color: "black", fontWeight: "bold" }}>{dino2PlayerName}</Text>
                    </View>

                    <View style={styles.dinoView}>

                        <TouchableOpacity onPress={() => this.dinoPressed("mario")}>
                            <Image style={this.state.dino1Pressed ? styles.redDinoPressed : null} source={require("../assets/images/idlingDinoRed.gif")} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.dinoPressed("dino2")}>
                            <Image source={require("../assets/images/idlingDinoGreen.gif")} style={this.state.dino2Pressed ? styles.greenDinoPressed : null} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Fab
                            active={this.state.active}
                            direction="left"
                            containerStyle={{}}
                            style={{ backgroundColor: 'black' }}
                            position="bottomRight"
                            onPress={() => this.setState({ active: !this.state.active })}>

                            <Icon name="logo-game-controller-a" />

                            <Grid disable>
                                <Col style={{
                                    backgroundColor: '#006400', height: 145, width: 455, borderRadius: 13, marginRight: 400,
                                    marginBottom: 75, borderWidth: 2, borderColor: "black"
                                }}>
                                    <Text style={styles.instructionText}>- Press on the RIGHT side of the Screen to move RIGHT.</Text>
                                    <Text style={styles.instructionText}>- Press on the LEFT side of the Screen to move LEFT.</Text>
                                    <Text style={styles.instructionText}>- Tap anywhere to JUMP.</Text>
                                    <Text style={styles.instructionText}>- Double tap on EITHER side of the screen to JUMP in THAT direction after tapping to JUMP.</Text>
                                    <Text style={styles.instructionText}>- It is not meant to be EASY</Text>
                                </Col>

                            </Grid>
                        </Fab>
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
        margin: 5,
        width: 130,

    },
    container: {
        flex: 1,
    },

    dinoView: {
        flexDirection: 'row',
        marginLeft: "28%"

    },

    buttonView: {
        marginTop: "5%",
        flexDirection: 'row',
        marginLeft: "18%",
    },

    ChoosePlayerText: {
        flexDirection: 'row',
        marginLeft: "30%",
        marginTop: "2%"
    },


    redDinoPressed: {
        borderWidth: 5,
        borderColor: "red",
        borderRadius: 15
    },

    greenDinoPressed: {
        borderWidth: 5,
        borderColor: "#006400",
        borderRadius: 15
    },
    instructionText: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 1

    }
});
