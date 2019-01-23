import Matter from "matter-js";
import Hammer from "../components/props/hammer";
import { distance, base, position, any } from "../utils";

let powerUpId = 0;

const pickupHammers = entities => {
	let mario = entities.mario;
	let tpKeys = Object.keys(entities).filter(k => entities[k].toiletPaper);
    console.log("here")
	tpKeys.forEach(k => {
        let tp = entities[k];
        console.log("here")

		if (distance(tp.position, mario.body.position) < 10) {
            console.log("tp picked up")
			let holding = {
                ...mario.actions,
                // ***** need new gif here? ***** //
				idling: MarioIdlingHammering,
				walking: MarioWalkingHammering
			};

			mario.animations.hammering = {
				duration: 1000000000,
				animate() {
					mario.actions = holding;
					mario["power-ups"].holding = true;
				},
				complete() {
					mario.actions = {
						...mario.actions,
						idling: MarioIdling,
						walking: MarioWalking
					};
					mario["power-ups"].holding = false;
				}
			};

			delete entities[k];
		}
	});
};

export default (entities, { events, dispatch }) => {
	pickupHammers(entities);

	return entities;
};