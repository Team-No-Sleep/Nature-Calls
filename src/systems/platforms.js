import Matter from "matter-js";
import { interpolateBasis } from "d3-interpolate";
import { find, filter, any } from "../utils";
import { standing } from "../utils/platforms";
import { collisionCategories } from "../utils/constants";

const jump = mario => {
	return {
		args: {
			direction: mario.direction.horizontal,
			walking: mario.action === "walking",
			interpolateX: interpolateBasis([2, 2, 3, 4, 2, 2, 1]),
			interpolateY: interpolateBasis([3, 3, 4, 6, 2, -2, -1, -1, -1, -1])
		},
		duration: 700,
		animate(
			_,
			percent,
			{ walking, direction, interpolateX, interpolateY }
		) {
			mario.action = "jumping";
			let forceX = walking
				? interpolateX(percent) * (direction === "right" ? 1 : -1)
				: 0;
			let forceY = interpolateY(percent);
			Matter.Body.applyForce(mario.body, mario.body.position, {
				x: forceX,
				y: -forceY
			});
		},
		complete() {
			mario.action = "idling";
		}
	};
};

export default (entities, { events }) => {
	let mario = entities.mario;

	if (mario.controls.mode !== "platform") return entities;

	Matter.Sleeping.set(mario.body, false);
	mario.body.collisionFilter.mask = collisionCategories.barrier | collisionCategories.platform | collisionCategories.barrel;

	let platforms = filter(entities, "platform");
	let gestures = mario.controls.gestures;
	let grounded = any(platforms, p => standing(p, mario));
	let jumping = mario.animations.jump;

	let actions = [
		{
			if: grounded && !jumping && (gestures.tap || gestures.swipeUp),
			then: () => {
				mario.animations.jump = jump(mario);
			}
		},
		{
			if: grounded && gestures.hold && !jumping,
			then: () => {
				mario.action = "walking";
				Matter.Body.applyForce(mario.body, mario.body.position, {
					x: mario.direction.horizontal === "right" ? 2.5 : -2.5,
					y: 0
				});
			}
		},

		{
			if: true,
			then: () => {
				mario.action = "idling";
			}
		}
	];

	find(actions, "if").then();

	return entities;
};
