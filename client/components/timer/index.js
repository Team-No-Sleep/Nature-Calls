import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
  } from 'react-native';
import Matter from "matter-js"
import TimerBg from "./timerBg.gif";
import Tile from "../common/tile";

export class Timer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: 300 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    
    secondsToTime(secs){
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
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
		<Text style = {[styles.timer]} onPress={this.startTimer}>
        {this.state.time.m}: {this.state.time.s}
        </Text>
      );
    }
  }

export default (pos) => {

    return {
    // animations: {},
	renderer: <Timer />,
	// renderer: <Tile />,
	// size: { width: 20, height: 20 },
	// position: pos,
	// source: TimerBg, 
	// TimerBg: true,
	// angle: -1.5708
    };
}

const styles = StyleSheet.create({
    timer: {
	fontSize: 30,
	color: "#00A400",
	textShadowOffset: { width: 0, height: 1 },
	textShadowColor: "black",
	textShadowRadius: 2,
	transform: [{ rotate: '270deg'}],
	marginTop: "80%",
	marginRight: "80%",
	fontWeight: "bold"
    }
});
