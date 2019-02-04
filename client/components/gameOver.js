import React, { PureComponent } from "react";
import Popup from "./popup";
import Message from "./message";
import playerOneGif from "../components/mario/red/mario-walking-hammering.gif";
import playerTwoGif from "../components/mario/green/mario-walking-hammering.gif";

export default class GameOver extends PureComponent {
	render() {
        
		return (
			<Popup onPlayAgain={this.props.onPlayAgain} onQuit={this.props.onQuit}>
            
				<Message image={this.props.playerOneWon ? playerOneGif : playerTwoGif}>
					Game Over!
				</Message>
			</Popup>
		);
    }
}

