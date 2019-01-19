import Matter from "matter-js";
import { any } from "../utils";
import { Dimensions } from "react-native";

const swipe = (touches, dispatch) => {
	let move = touches.find(x => x.type === "move");
	
	if (move) {
		if (move.delta.locationX < -2)
			dispatch({ type: "swipe-up" });

		if (move.delta.locationX > 2)
			dispatch({ type: "swipe-down" });

		if (move.delta.locationY < -2)
			dispatch({ type: "swipe-left" });

		if (move.delta.locationY > 2)
			dispatch({ type: "swipe-right" });
	}
};

const hold = (touches, events, dispatch) => {

	const { height } = Dimensions.get("window");
	const cy = height / 2;
	//console.log(events);

	let move = touches.find(x => x.type === "move");

	let fingerDown = any(touches, "type", ["long-press", "move"]);
	let fingerUp = any(touches, "type", "end");
	let holdRight =  any(events, "type", "hold-right");
	let holdLeft = any(events, "type", "hold-left");
	let hold = any(events, "type", "hold");
	//console.log(hold)
	// console.log(move);
	if (move) {
	// 	//console.log("true")

		//console.log(move.event.locationY)
		if ((fingerDown || holdRight || holdLeft) && !fingerUp) {
			if(move.event.locationY > cy)
				dispatch({ type: "hold-left" });
			else
				dispatch({ type: "hold-right" });
		}
	} 
	if ((fingerDown || hold) && !fingerUp) {
		//console.log("hold")
		dispatch({ type: "hold" });
	}
};

const tap = (touches, dispatch) => {
	let press = any(touches, "type", "press");

	if (press)
		dispatch({ type: "tap"})
};

export default (entities, { touches, events, dispatch }) => {
	swipe(touches, dispatch)
	hold(touches, events, dispatch)
	tap(touches, dispatch)

	return entities;
};