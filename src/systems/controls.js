import {
	find,
	filter,
	any,
	truthy,
	base,
	top,
	distance
} from "../utils";
import { nearBase, aboveTop, closest } from "../utils/ladders";
import {
	closestAbove,
	closestBelow,
	aboveTopEdge,
	standing
} from "../utils/platforms";

export default (entities, { events }) => {
	let mario = entities.mario;
	let ladders = filter(entities, "ladder").filter(l => l.ladder.climbable);
	let platforms = filter(entities, "platform");

	let swipeUp = any(events, "type", "swipe-up");
	let swipeDown = any(events, "type", "swipe-down");
	let swipeLeft = any(events, "type", "swipe-left");
	let swipeRight = any(events, "type", "swipe-right");
	let tap = any(events, "type", "tap");
	let hold = any(events, "type", "hold");

	let current = closest(ladders, mario);
	let nearBaseOfLadder = distance(base(current), base(mario)) < 20;
	let nearTopOfLadder = distance(top(current), base(mario)) < 20;
	let platformAbove = closestAbove(platforms, current);
	let aboveLadder = aboveTopEdge(platformAbove, base(mario));
	let grounded = find(platforms, p => standing(p, mario));

	mario.controls.gestures = {
		swipeUp,
		swipeDown,
		swipeLeft,
		swipeRight,
		tap,
		hold
	}

	let modes = [
		{
			if: grounded && nearBaseOfLadder && swipeUp,
			then: () => {
				mario.controls.mode = "ladder";
			}
		},
		{
			if: grounded && nearTopOfLadder && swipeDown,
			then: () => {
				mario.controls.mode = "ladder";
			}
		},
		{
			if: aboveLadder && mario.controls.mode === "ladder",
			then: () => {
				mario.controls.mode = "platform";
				mario.direction.horizontal = current.ladder.exitDirection;
			}
		},
		{
			if:
				grounded &&
				nearBaseOfLadder &&
				mario.controls.mode === "ladder" &&
				any([swipeLeft, swipeRight, tap], truthy),
			then: () => {
				mario.controls.mode = "platform";
				mario.direction.horizontal = current.ladder.exitDirection;
				mario.controls.gestures = {};
			}
		},
		{
			if: true,
			then: () => {}
		}
	];

	modes.find(x => x.if).then();

	return entities;
};
