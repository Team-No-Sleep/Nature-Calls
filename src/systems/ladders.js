import Matter from "matter-js";
import { find, filter, position, shift, base } from "../utils";
import { closestAbove, closestBelow, aboveTopEdge } from "../utils/platforms";
import { closest } from "../utils/ladders";
import { collisionCategories } from "../utils/constants";

export default (entities, { events }) => {
	let mario = entities.mario;

	if (mario.controls.mode !== "ladder") return entities;

	Matter.Sleeping.set(mario.body, true);
	mario.body.collisionFilter.mask = 0;

	let ladders = filter(entities, x => x.ladder && x.ladder.climbable)
	let ladder = closest(ladders, mario);
	let platforms = filter(entities, "platform");
	let platformAbove = closestAbove(platforms, ladder);
	let platformBelow = closestBelow(platforms, ladder)
	let gestures = mario.controls.gestures;
	let goingUp = mario.direction.vertical === "up";
	let marioBase = base(mario);
	let canGoDown = aboveTopEdge(platformBelow, marioBase);
	let nearTop = aboveTopEdge(platformAbove, shift(marioBase, 0, -8))

	Matter.Body.setPosition(mario.body, { x: position(ladder).x, y: position(mario).y })


	let actions = [
		{
			if: gestures.hold && goingUp,
			then: () => {
				mario.action = nearTop ? "rising" : "climbing";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, -1))
			}
		},
		{
			if: gestures.hold && canGoDown,
			then: () => {
				mario.action = nearTop ? "rising" : "climbing";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, 1))

			}
		},
		{
			if: true,
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
			}
		}
	];

	find(actions, "if").then();

	return entities;
};
