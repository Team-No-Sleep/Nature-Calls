import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import StyleSheet from "react-native";
import TypeWriter from "react-native-typewriter";
import EStyleSheet from 'react-native-extended-stylesheet';


export default class Message extends PureComponent {
	render() {
		return (
			<Animatable.View
				useNativeDriver
				style={styles.message}
				animation={this.props.animation}
			>
						<Image style={styles.image} source={this.props.image} />

				{this.props.children && (
					<View style={styles.textContainer}>
						<TypeWriter
							style={styles.text}
							typing={1}
							maxDelay={50}
							onTyped={this.props.onTyped}
							onTypingEnd={this.props.onTypingEnd}
						>
							{this.props.children}
						</TypeWriter>
					</View>
				)}

			</Animatable.View>
		);
	}
}

const styles = EStyleSheet.create({
	message: {
		margin: 50
	},
	image: {
		alignSelf: "center",
		margin: 0,
		height: "40%",
		width: "40%"
	},
	textContainer: {
		padding: 10,
		borderRadius: 11,
		marginLeft: 30,
		marginRight: 30,
		minHeight: 80
	},
	text: {
		textAlign: "center",
		fontSize: 30,
		color: "white"
	}
});

EStyleSheet.build();
