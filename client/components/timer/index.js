import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
  } from 'react-native';
import Matter from "matter-js"
import TimerBg from "./timerBg.gif";
import Tile from "../common/tile";

export class Renderer extends PureComponent {
    constructor() {
        super();
        this.state = { time: {}, seconds: 360 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
        }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    
    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) {
        clearInterval(this.timer);
        }
    }
    render() {
      return (
		<Text>
		m: {this.state.time.m} s: {this.state.time.s} TESTSETS
			{/* <Tile
			source={TimerBg}
			size={this.props.size}
			position={this.props.body.position}
			angle={this.props.body.angle}
			/> */}
        </Text>
      );
    }
  }

export default (pos) => {

    return {
    animations: {},
	// renderer: <Renderer />,
	size: { width: 110, height: 75 },
	position: pos,
	source: TimerBg, 
	renderer: <Tile />,
	TimerBg: true,
	angle: -1.5708
    };
}

const styles = StyleSheet.create({
    timer: {
    position: "absolute"
    }
});
