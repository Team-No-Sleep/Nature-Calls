import Matter from "matter-js";
import Hammer from "../components/props/hammer";
import { distance, base, position, any } from "../utils";
import { crack } from "../utils/barrels";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const MarioIdling = resolveAssetSource(
	require("../components/mario/mario-idling.gif")
);
const MarioWalking = resolveAssetSource(
	require("../components/mario/mario-walking.gif")
);
const MarioIdlingHammering = resolveAssetSource(
	require("../components/mario/mario-idling-hammering.gif")
);
const MarioWalkingHammering = resolveAssetSource(
	require("../components/mario/mario-walking-hammering.gif")
);

let powerUpId = 0;

const generateHammers = (entities, events) => {
	let cracked = events.find(x => x.type == "barrel-cracked" && x.special);

	if (cracked) entities[`powerUp-${powerUpId++}`] = Hammer(cracked.position);
};

const pickupHammers = entities => {
	let mario = entities.mario;
	let hammerKeys = Object.keys(entities).filter(k => entities[k].hammer);

	hammerKeys.forEach(k => {
		let hammer = entities[k];

		if (distance(hammer.position, mario.body.position) < 20) {
			let hammering = {
				...mario.actions,
				idling: MarioIdlingHammering,
				walking: MarioWalkingHammering
			};

			mario.animations.hammering = {
				duration: 8000,
				animate() {
					mario.actions = hammering;
					mario["power-ups"].hammer = true;
				},
				complete() {
					mario.actions = {
						...mario.actions,
						idling: MarioIdling,
						walking: MarioWalking
					};
					mario["power-ups"].hammer = false;
				}
			};

			delete entities[k];
		}
	});
};

const destroyBarrels = (entities, dispatch) => {
	let mario = entities.mario;

	if (!mario["power-ups"].hammer) return;
	if (!any(["walking", "idling"], mario.action)) return;

	let marioBase = base(mario);
	let dir = mario.direction.horizontal;
	let world = entities.physics.world;
	let barrelKeys = Object.keys(entities).filter(key => entities[key].barrel);

	barrelKeys.forEach(key => {
		let b = entities[key];
		let barrelPos = position(b);
		let inQuadrant =
			dir == "left"
				? barrelPos.x <= marioBase.x
				: barrelPos.x >= marioBase.x;

		if (
			distance(barrelPos, marioBase) < 50 &&
			barrelPos.y < marioBase.y &&
			inQuadrant
		) {
			crack(key, entities, dispatch);
		}
	});
};

export default (entities, { events, dispatch }) => {
	generateHammers(entities, events);
	pickupHammers(entities);
	destroyBarrels(entities, dispatch);

	return entities;
};
