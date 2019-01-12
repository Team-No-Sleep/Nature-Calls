import React, { PureComponent } from "react";
import Popup from "../popup";
import Message from "../message";
import Princess from "./princess-large.gif";
import Mario from "./mario-large.gif";
import LoveHeart from "./love-heart.gif";

export default class PrincessRescued extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showMario: false,
			showLoveHeart: false
		};
	}

	princessFinishedTalking = () => {
		setTimeout(() => {
			this.setState({
				showMario: true
			});
		}, 1000);
	};

	marioFinishedTalking = () => {
		setTimeout(() => {
			this.setState({
				showLoveHeart: true
			});
		}, 1000);
	};

	render() {
		return (
			<Popup
				onPlayAgain={this.props.onPlayAgain}
				onQuit={this.props.onQuit}
			>
				<Message
					image={Princess}
					onTypingEnd={this.princessFinishedTalking}
				>
					Ciao Bello! You risked your life to save this would-be
					Princessa.. How can I ever make it up to you?
				</Message>

				{this.state.showMario && (
					<Message
						image={Mario}
						animation="bounceIn"
						onTypingEnd={this.marioFinishedTalking}
					>
						Say no more Bella! The pleasure is all mine! I'm heading
						to the piazza - how about a night cap?
					</Message>
				)}

				{this.state.showLoveHeart && (
					<Message image={LoveHeart} animation="bounceIn" />
				)}
			</Popup>
		);
	}
}
