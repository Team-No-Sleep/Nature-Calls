import Matter from "matter-js";
import { remove } from "./index";

const crack = (id, entities, dispatch) => {
	let entity = entities[id];

	if (!entity.animations.cracked) {
		Matter.Sleeping.set(entity.body, true);
		Matter.Composite.remove(entities.physics.world, entity.body);

		entity.animations.cracked = {
			duration: 600,
			animate() {
				entity.action = "cracked";
			},
			complete() {
				dispatch({
					type: "barrel-cracked",
					special: entity.barrel.special,
					position: entity.body.position
				});

				remove(id, entities);
			}
		};
	}
};

module.exports = {
	crack
};
