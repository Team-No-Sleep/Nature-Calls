import React, { PureComponent } from "react";

import { StyleSheet, Modal, Alert, ImageBackground, View, StatusBar, Image, TouchableOpacity} from "react-native";

import { Container, Header, Content, Button, Text, List, ListItem, Left } from 'native-base';

import API from '../utils/API';





export default class LeaderBoard extends PureComponent {

    state = {
        leaderBoard: []
        
    }
    
    componentDidMount() {
        
        API.getLeaderBoard().then(res => {
            console.log(res.data);
            
            this.setState({leaderBoard: res.data});
            console.log(this.state.leaderBoard[0].local.username)
            
        })

    }

    

    render() {
        if(this.state.leaderBoard.length === 0) {
                return null;
        }

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
                            <Text>Username {"\t"}  Wins {"\t"} Rolls Delivered</Text>
                        </ListItem>
                        {/* {this.state.leaderBoard.map(user => { this SHOULD WORK?!?!?!*/} 
                        <ListItem>
                            <Text>{this.state.leaderBoard[0].local.username}            {this.state.leaderBoard[0].local.userWins}  Wins   {this.state.leaderBoard[0].local.userScores} Rolls Delivered</Text>
                        </ListItem>

                        <ListItem>
                        <Text>{this.state.leaderBoard[1].local.username}            {this.state.leaderBoard[1].local.userWins}  Wins   {this.state.leaderBoard[1].local.userScores} Rolls Delivered</Text>
                        </ListItem>





                         {/* })}  */}


                        {/* <ListItem>
                            <Text>{this.state.leaderBoard[0].local.username + "\t" + this.state.leaderBoard[0].local.userWins}</Text>
                        </ListItem>
                         */}
                   
                    {/* </List> */}
                    </Content>
                </Container>

                <View style={styles.buttonView}>
                    <Button rounded success style={styles.button} onPress={this.props.onClose}>
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