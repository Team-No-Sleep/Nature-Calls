import Matter from "matter-js";
import { filter, base, shift, remove } from "../utils";
import { aboveTopEdge } from "../utils/platforms";
import { collisionCategories } from "../utils/constants";

const removeEntitiesThatHaveFallenTooFar = entities => {
	let world = entities.physics.world;
	let removals = Object.keys(entities).filter(
		key =>
			key != "mario" &&
			entities[key].body &&
			entities[key].body.position.y > 1000
	);

	removals.forEach(key => {
		remove(key, entities);
	});

	return entities;
};

const checkIfMarioHasFallenOff = (entities, dispatch) => {
	let mario = entities.mario;

	if (mario.body.position.y > 1000) {
		Matter.Sleeping.set(mario.body, true);
		mario.action = "dead";
		dispatch({ type: "game-over" });
	}

	return entities;
}

const updatePlatformCollisionFilters = entities => {
	let mario = entities.mario;
	let platforms = filter(entities, "platform");
	let active = filter(platforms, p => aboveTopEdge(p, shift(base(mario), 0, -2)));
	let others = filter(platforms, x => active.indexOf(x) === -1);

	active.forEach(x => {
		x.body.collisionFilter.mask = collisionCategories.mario | collisionCategories.barrel;
	});

	others.forEach(x => {
		x.body.collisionFilter.mask = collisionCategories.barrel;
	});

	return entities;
};

const updatePhysicsEngine = (entities, time) => {
	let engine = entities.physics.engine;
	Matter.Engine.update(engine, time.delta);
};

const setMarioUpright = entities => {
	let mario = entities.mario;
	Matter.Body.setAngle(mario.body, 0);
};

export default (entities, { time, dispatch }) => {
	removeEntitiesThatHaveFallenTooFar(entities);
	checkIfMarioHasFallenOff(entities, dispatch);
	updatePlatformCollisionFilters(entities);
	updatePhysicsEngine(entities, time);
	setMarioUpright(entities);

	return entities;
};
