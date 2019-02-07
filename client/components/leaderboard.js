import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, Image, TouchableOpacity} from "react-native";

import { Container, Header, Content, Button, Text, List, ListItem, Left } from 'native-base';




export default class LeaderBoard extends PureComponent {

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

                <View style={styles.ChoosePlayerText}><Text h1>Leaderboard</Text></View>
                
                <Container>
                <Header itemHeader first>
                    <List style={styles.list}>
                        <Text>PLAYER</Text>
                    </List>
                    <List style={styles.list2}>
                        <Text>SCORE</Text>
                    </List>
                </Header>
                    <Content>
                    {/* <List style={styles.list}> */}
                        <ListItem>
                        <Text>Dave Anderson</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Lakshmi Strom</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Trae Shanks</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Kelvin Paje</Text>
                        </ListItem>
                        <ListItem>
                        <Text>Jules Azuma</Text>
                        </ListItem>
                    {/* </List> */}
                    </Content>
                </Container>

                <View style={styles.buttonView}>
                    <Button rounded success style={styles.button} onPress={this.props.onLobby}>
                        <Text>Go Back</Text>
                    </Button>
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

          ChoosePlayerText: {
            marginTop: "5%",
            marginBottom: "2%",
            flexDirection: 'row',
            marginLeft: "45%",
          },

          buttonView: {
            marginTop: "2%",
            marginBottom: "5%",
            flexDirection: 'row',
            marginLeft: "43%",
          },

          list: {
            marginRight:"75%",
          },

          list2: {
            marginLeft: "-25%",
          }


          
    });