import Matter from "matter-js";
import { interpolateBasis } from "d3-interpolate";
import { find, filter, any } from "../utils";
import { standing } from "../utils/platforms";
import { collisionCategories } from "../utils/constants";

const jump = (mario, entities) => {
	let gestures = mario.controls.gestures;

	return {
		args: {
			direction: mario.direction.horizontal,
			walking: mario.action === "walking",
			interpolateX: interpolateBasis([2, 2, 3, 4, 2, 2, 1]),
			interpolateY: interpolateBasis([3, 3, 4, 6, 2, -2, -1, -1, -1, -1])
		},
		duration: 1000,
		animate(
			_,
			percent,
			{ walking, direction, interpolateX, interpolateY }
		) {
			mario.action = "jumping";
			let forceX = (gestures.swipeRight || gestures.swipeLeft)
				? interpolateX(percent) * (direction === "right" ? -1 : 1)
				: 0;
			let forceY = interpolateY(percent);
			//(gestures.swipeRight);
			Matter.Body.applyForce(mario.body, mario.body.position, {
				x: -forceY,
				y: forceX
			});
		},
		complete() {
			mario.action = "idling";
		}
	};
};

export default (entities, { events }) => {
	let mario = entities.mario;
	let dino2 = entities.dino2;
	// TODO: Make better data structure for holding which characters are alive

	//console.log("here")
	let characters = [mario];
		for (let char of characters) {
			if (char) {
				if (char.controls.mode !== "platform") return entities;

				Matter.Sleeping.set(char.body, false);
				char.body.collisionFilter.mask = collisionCategories.barrier | collisionCategories.platform;

				let platforms = filter(entities, "platform");
				let gestures = char.controls.gestures;
				// let grounded = any(platforms, p => standing(p, char));
				let jumping = char.animations.jump;
				// if(grounded) {
				// 	console.log("grounded")
				// }

				let actions = [
					{
						if: !jumping && (gestures.tap || gestures.swipeUp),
						then: () => {
							char.animations.jump = jump(char, entities);
						}
					},
					{
						if: (gestures.holdLeft || gestures.holdRight || gestures.hold) ,
						then: () => {
							char.action = "walking";
							if (gestures.hold) {
								//console.log("hold")
								Matter.Body.applyForce(char.body, char.body.position, {
									x: 0,
									y: char.direction.horizontal === "right" ? -2.5 : 2.5
								});
							} 
						},
					},

					{
						if: true,
						then: () => {
							char.action = "idling";
						}
					}
				];

				find(actions, "if").then();
		}

	}


	return entities;
};
