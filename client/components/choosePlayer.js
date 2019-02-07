import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, Image, TouchableOpacity} from "react-native";


import { Container, Header, Content, Button, Text , Icon, Fab, Card, CardItem, Body} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';



export default class ChoosePlayer extends PureComponent {

    state = {
        dino1Pressed: false,
        dino2Pressed: false
    }
    
    dinoPressed = (dino) => {
        if(dino) {
            this.setState({dino1Pressed: true, dino2Pressed: false});
        } else {
            this.setState({dino2Pressed: true, dino1Pressed: false});
        }
    }

    render() {

        
        return(
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

                        <Button rounded success style={styles.button} onPress={this.props.onLogOut}>
                            <Text>LogOut</Text>
                        </Button>
                    </View>

                    <View style={styles.ChoosePlayerText}><Text h1 style={{color: "#DAF7A6", fontWeight: "bold"}}>Choose Player</Text></View>
                
                <View style={styles.dinoView}>

                <TouchableOpacity onPress={() => this.dinoPressed(true)}>
                        <Image style={this.state.dino1Pressed ? styles.redDinoPressed : null} source={require("../assets/images/idlingDinoRed.gif")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.dinoPressed(false)}>
                        <Image source={require("../assets/images/idlingDinoGreen.gif")} style={this.state.dino2Pressed ? styles.greenDinoPressed : null}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1}}>
                        <Fab
                            active={this.state.active}
                            direction="left"
                            containerStyle={{ }}
                            style={{ backgroundColor: 'black' }}
                            position="bottomRight"
                            onPress={() => this.setState({ active: !this.state.active })}>

                            <Icon name="logo-game-controller-a" />

                            <Grid disable>
                                <Col style={{ backgroundColor: '#006400', height: 145, width: 455, borderRadius: 13, marginRight: 400,
                                marginBottom: 75, borderWidth: 2, borderColor: "black" }}>
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
            marginLeft: "33%",
            marginTop: "5%"
          },

          buttonView: {
            marginTop: "2%",
            flexDirection: 'row',
            marginLeft: "35%",
          },

          ChoosePlayerText: {
            flexDirection: 'row',
            marginLeft: "45%",
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