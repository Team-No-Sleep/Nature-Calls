import React, { Component } from "react";
import { View, TextInput, StyleSheet, ImageBackground } from "react-native";
import { NavigationActions } from "react-navigation";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Form, Item, Label, Input } from 'native-base';
import styles from "./styles";
import API from "../../utils/API";

export default class SignInScreen extends Component {
    state = {
        username: "",
        password: ""
    }
    goToMain = (userObj) => {console.log("loading Home")
    console.log(userObj);
        const navigateAction = NavigationActions.navigate({
            routeName: "Home",
            params: { data: userObj }
        });
        this.props.navigation.dispatch(navigateAction);
        //this.props.navigation.goBack();
    }
    signUp = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: "SignUp"
        });
        this.props.navigation.dispatch(navigateAction);
        //this.props.navigation.goBack();
    }
    login = () => {
        API.login(this.state)
            .then(res => this.goToMain(res.data))
            .catch(err => console.log(err));
    }
    render() {
        return (
                <Container>
                    <ImageBackground style={styles.background} source={require("../../assets/backgrounds/userLogin-1.png")}>
                    <Form >
                        <Item rounded style={styles.textBox}>
                            <Icon active name='people' />
                            <Input placeholder='Username' onChangeText={(value) => this.setState({ username: value })}/>
                        </Item>

                        <Item rounded style={styles.textBox}>
                            <Icon active name='finger-print' />
                            <Input placeholder = "Password" secureTextEntry={true} onChangeText={(value) => this.setState({ password: value })}></Input>
                        </Item>

                        <Button  block title="Login" onPress={() => this.login()} style={styles.buttons}>
                            <Text>Login</Text>
                        </Button>

                        <Button block title="Register" onPress={() => this.signUp()} style={styles.buttons}>
                            <Text>Register</Text>
                        </Button>
                    </Form>
                    </ImageBackground>
                </Container>
            
        );
    }
};


