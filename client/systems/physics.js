import Matter from "matter-js";
import { filter, base, shift, remove } from "../utils";
import { aboveTopEdge } from "../utils/platforms";
import { collisionCategories } from "../utils/constants";

//detects when mario is standing on a platform
const updatePlatformCollisionFilters = entities => {
	let mario = entities.mario;
	let dino2 = entities.dino2;
	let platforms = filter(entities, "platform");
	if (mario) {
		let active = filter(platforms, p => aboveTopEdge(p, shift(base(mario), 0, -20)));
		active.forEach(x => {
			x.body.collisionFilter.mask = collisionCategories.mario;
		});
	}

	if (dino2) {

		let active2 = filter(platforms, p => aboveTopEdge(p, shift(base(dino2), 0, -20)));

		active2.forEach(x => {
			x.body.collisionFilter.mask = collisionCategories.mario;
		});	
	}

	return entities;
};

//allows constant detection for interaction
const updatePhysicsEngine = (entities, time) => {
	let engine = entities.physics.engine;
	Matter.Engine.update(engine, time.delta);
};

//keeps sprite from rolling when interacting with entities
const setMarioUpright = entities => {
	let mario = entities.mario;
	let dino2 = entities.dino2
	if (mario) {
		Matter.Body.setAngle(mario.body, 0);
	}
	if (dino2) {
		Matter.Body.setAngle(dino2.body, 0);
	}
};

export default (entities, { time, dispatch }) => {
	updatePlatformCollisionFilters(entities);
	updatePhysicsEngine(entities, time);
	setMarioUpright(entities);

	return entities;
};
