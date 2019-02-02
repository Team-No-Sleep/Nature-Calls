import React, { Component } from "react";
import {Image, View, ImageBackground} from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Form, Item, Label, Input } from 'native-base';
import { NavigationActions } from "react-navigation";
import { ImagePicker, Permissions } from "expo";
import styles from "./styles";
import API from "../../utils/API";

export default class SignUp extends Component {
    state = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        photo: ""
    }
    signUp = () => {
        //deconstruct state object
        const { username, password, firstName, lastName, photo } = this.state;

        //create newUser object to be sent to database
        const newUser = { username, password, firstName, lastName, photo };

        API.registerUser(newUser)
            .then(res => {
                console.log("SUCCESSFUL SIGNUP");
                this.handleLoginRedirect(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    _pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            console.log(result);
            if (!result.cancelled) {
                this.setState({ photo: result.uri });
            }
        } else {
            throw new Error("Camera roll permissions not granted");
        }
    };
    handleLoginRedirect = (userObj) => {
        const navigateAction = NavigationActions.navigate({
            routeName: "Home",
            params: { data: userObj }
        });
        this.props.navigation.dispatch(navigateAction);
        //this.props.navigation.goBack();
    };
    render() {
        return(
        <Container>
            <ImageBackground style={styles.background} source={require("../../assets/backgrounds/userLogin-1.png")}>
                <Content>
                    <Form>
                        <Item rounded style={styles.textBox}>
                                <Icon active name='people' />
                                <Input placeholder='Username' onChangeText={(value) => this.setState({ username: value })}/>
                        </Item>

                        <Item rounded style={styles.textBox}>
                                <Icon active name='finger-print' />
                                <Input placeholder = "Password" secureTextEntry={true} onChangeText={(value) => this.setState({ password: value })}></Input>
                        </Item>

                        <Item rounded style={styles.textBox}>
                            <Icon active name='person-add' />
                            <Input placeholder = "First Name" onChangeText={(value) => this.setState({ firstName: value })} />
                        </Item>
                        <Item rounded style={styles.textBox}>
                            <Icon active name='person' />
                            <Input placeholder = "Last Name" onChangeText={(value) => this.setState({ lastName: value })} />
                        </Item>

                        <Item rounded style={styles.textBox}>
                            <Icon active name="download"></Icon>
                            <Label>Profile Picture</Label>

                            <Text note style={{ marginRight: '20%' }}>{this.state.photo ? "uploaded profile picture" : null}</Text>
                        </Item>

                        <Button block onPress={this._pickImage} title="Upload from Photo Library" style={styles.buttons}>
                            <Text>Upload Photo</Text>
                        </Button>

                        <Button block onPress={this.signUp} title="Sign Up" style={styles.buttons}>
                            <Text>Sign Up</Text>
                        </Button>
                        
                    </Form>
                </Content>
            </ImageBackground>
        </Container>
        );
    }
}