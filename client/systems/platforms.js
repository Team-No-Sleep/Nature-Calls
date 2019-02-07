import Matter from "matter-js";
import { interpolateBasis } from "d3-interpolate";
import { find, filter, any } from "../utils";
import { standing } from "../utils/platforms";
import { collisionCategories } from "../utils/constants";

const jump = (mario, entities) => {
	let gestures = mario.controls.gestures;
	let walk;
	if (mario["power-ups"].holding) {
		walk = "walkingHammering";
	} else {
		walk = "walking";
	}
	return {
		args: {
			direction: mario.direction.horizontal,
			walking: mario.action === walk,
			interpolateX: interpolateBasis([2, 2, 3, 4, 2, 2, 1]),
			interpolateY: interpolateBasis([3, 3, 4, 6, 2, -2, -1, -1, -1, -1])
		},
		duration: 1000,
		animate(
			_,
			percent,
			{ walking, direction, interpolateX, interpolateY }
		) {
			if (mario["power-ups"].holding) {
				mario.action = "JumpingHammering";
			} else {
				mario.action = "jumping";
			}
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
			if (mario["power-ups"].holding) {
				mario.action = "idlingHammering";
			} else {
				mario.action = "idling";
			}

		}
	};
};

export default (entities, { events }) => {
	let mario = entities.mario;
	let dino2 = entities.dino2;
	let chosenCharacter;
	if (mario.isPlayerCharacter === true) {
		chosenCharacter = mario;
	} else if (dino2.isPlayerCharacter === true) {
		chosenCharacter = dino2;
	}
	// TODO: Make better data structure for holding which chosenCharacter are alive
	

	if (chosenCharacter) {
		if (chosenCharacter.controls.mode !== "platform") return entities;

		Matter.Sleeping.set(chosenCharacter.body, false);
		chosenCharacter.body.collisionFilter.mask = collisionCategories.barrier | collisionCategories.platform;

		let platforms = filter(entities, "platform");
		let gestures = chosenCharacter.controls.gestures;
		// let grounded = any(platforms, p => standing(p, chosenCharacter));
		let jumping = chosenCharacter.animations.jump;
		// if(grounded) {
		// 	console.log("grounded")
		// }

		let actions = [
			{
				if: !jumping && (gestures.tap || gestures.swipeUp),
				then: () => {
					chosenCharacter.animations.jump = jump(chosenCharacter, entities);
				}
			},
			{
				if: (gestures.holdLeft || gestures.holdRight || gestures.hold),
				then: () => {
					if (chosenCharacter["power-ups"].holding) {
						chosenCharacter.action = "walkingHammering";
					} else {
						chosenCharacter.action = "walking";
					}
					if (gestures.hold) {
						//console.log("hold")
						Matter.Body.applyForce(chosenCharacter.body, chosenCharacter.body.position, {
							x: 0,
							y: chosenCharacter.direction.horizontal === "right" ? -2.5 : 2.5
						});
					}
				},
			},

			{
				if: true,
				then: () => {
					if (chosenCharacter["power-ups"].holding) {
						chosenCharacter.action = "idlingHammering";
					} else {
						chosenCharacter.action = "idling";
					}
				}
			}
		];

		find(actions, "if").then();


	}


	return entities;
};
