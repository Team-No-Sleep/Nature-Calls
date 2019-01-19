import {
	find,
	filter,
	any,
	truthy,
	base,
	top,
	distance
} from "../utils";
import {
	closestAbove,
	closestBelow,
	aboveTopEdge,
	standing
} from "../utils/platforms";

export default (entities, { events }) => {
	let mario = entities.mario;
	let platforms = filter(entities, "platform");
	let swipeUp = any(events, "type", "swipe-up");
	let swipeDown = any(events, "type", "swipe-down");
	 let swipeLeft = any(events, "type", "swipe-left");
	 let swipeRight = any(events, "type", "swipe-right");
	let tap = any(events, "type", "tap");
	let holdRight = any(events, "type", "hold-right");
	let holdLeft = any(events, "type", "hold-left");
	let hold = any(events, "type", "hold");


	// let current = closest(mario);
	// let platformAbove = closestAbove(platforms, current);
	let grounded = find(platforms, p => standing(p, mario));

	mario.controls.gestures = {
		swipeUp,
		swipeDown,
		 swipeLeft,
		 swipeRight,
		tap,
		holdRight,
		holdLeft,
		hold
	}

	return entities;
};
