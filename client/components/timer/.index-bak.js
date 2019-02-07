import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
  } from 'react-native';
import Matter from "matter-js"
import TimerBg from "./timerBg.png";
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
        <div>
        <button onClick={this.startTimer}>Start</button>
        m: {this.state.time.m} s: {this.state.time.s}
        </div>
      );
    }
  }



   
    // render() {
    //     <Text>
    //         <Button 
    //             onPress={this.startTimer}
    //             title="Test timer"
    //         />
    //         m: {this.state.time.m} s: {this.state.time.s}
    //     </Text>
    // }
  
const styles = StyleSheet.create({
    timer: {
    position: "absolute"
    }
});

export default (pos) => {
    let width = 220;
    let height = 150;
    let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height);
      Matter.World.add(world, [body]);

    return {
    body,
    size: { width, height },
    animations: {},
    renderer: <Renderer />
    };
}
  
//   ReactDOM.render(<Timer/>, document.getElementById('View'));