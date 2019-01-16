import Matter from "matter-js";
import { any } from "../utils";

const swipe = (touches, dispatch) => {
	let move = touches.find(x => x.type === "move");
	
	if (move) {
		if (move.delta.locationX < -2)
			dispatch({ type: "swipe-left" });

		if (move.delta.locationX > 2)
			dispatch({ type: "swipe-right" });

		if (move.delta.locationY < -2)
			dispatch({ type: "swipe-up" });

		if (move.delta.locationY > 2)
			dispatch({ type: "swipe-down" });
	}
};

const hold = (touches, events, dispatch) => {
	let fingerDown = any(touches, "type", ["long-press", "move"]);
	let fingerUp = any(touches, "type", "end");
	let hold =  any(events, "type", "hold");
	
	if ((fingerDown || hold) && !fingerUp)
		dispatch({ type: "hold" });
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