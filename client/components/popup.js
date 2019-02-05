import React, { PureComponent } from "react";
import { ScrollView, View, Dimensions , StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./button";


export default class Popup extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {

        //this.props.play();
		return (
			// <Animatable.View
			// 	useNativeDriver
			// 	style={styles.container}
			// 	animation="fadeInLeft"
            // >
            <View style={styles.container}>
                {this.props.children}
                <Button 
                onPress={this.props.onPlayAgain} style={styles.playGameButton}
                >
                
                    Rematch!
                </Button>
                <Button onPress={this.props.onQuit} style={styles.cancelButton} >
                    Back to Lobby
                </Button> 
            </View>

				
			// </Animatable.View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		margin: 100,
		padding: 0,
		flex: 1,
        backgroundColor: "transparent",
        transform: [{ rotate: '-90deg'}],
        width: Dimensions.get("window").height,
        height:  Dimensions.get("window").width * 0.3


	},
	playGameButton: {
		maxWidth: Dimensions.get("window").height * 1.2,
		alignSelf: "center",
        marginBottom: 0,
        position: "relative",
        bottom: "40%",
        
	},
	cancelButton: {
		maxWidth: Dimensions.get("window").height * 1.2,
		alignSelf: "center",
        backgroundColor: "#ff4136",
        position: "relative",
        bottom: "40%",
	}
});
