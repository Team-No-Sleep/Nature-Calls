import React, { PureComponent } from "react";
import Popup from "../popup";
import Message from "../message";
import WiseMonkey from "./wise-monkey.gif";

export default class GameOver extends PureComponent {
	render() {
		return (
			<Popup onPlayAgain={this.props.onPlayAgain} onQuit={this.props.onQuit}>
				<Message
					image={WiseMonkey}
				>
					Looks like the monkey got the better of you..
					Better luck next time!
				</Message>
			</Popup>
		);
	}
}

