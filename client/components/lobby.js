import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, } from "react-native";

import { Container, Header, Content, Button, Text, Icon, Fab } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';


export default class Lobby extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return(
            <ImageBackground style={this.props.containerStyle} source={require("../assets/images/nature_calls_loading.png")}>

            <View style={styles.buttonView}>

            <Button rounded success style={styles.button} onPress={this.props.onPlayGame}>
                <Text>Play Game</Text>
            </Button>

            <Button rounded success style={styles.button} onPress={this.props.onLeaderBoard}>
                <Text>Leaderboard</Text>
            </Button>

            <Button rounded success style={styles.button} onPress={this.props.onLogOut}>
                <Text>Log Out</Text>
            </Button>
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

        instructionText: {
            fontSize: 15,
            marginTop: 5,
            marginBottom: 1
    
        },

        buttonView: {
            marginTop: "5%",
            flexDirection: 'row',
            marginLeft: "18%",
        },
        
    

    });