import Matter from "matter-js";

import { distance, base, position, any } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";


const MarioIdling = resolveAssetSource(
	require("../components/mario/mario-idling.gif")
);
const MarioWalking = resolveAssetSource(
	require("../components/mario/mario-walking.gif")
);
let powerUpId = 0;

const pickupTP = entities => {
    
	let mario = entities.mario;
	let tpKeys = Object.keys(entities).filter(k => entities[k].ToiletPaper);
	tpKeys.forEach(k => {
        
        let tp = entities[k];
        //console.log(distance(tp.position, mario.body.position));
		if (distance(tp.position, mario.body.position) < 20) {
            console.log("tp picked up")
			let holding = {
                ...mario.actions,
                // ***** need new gif here? ***** //
				idling: MarioIdling,
				walking: MarioWalking
            };
            
            // I guess here we need new gifs for holding the TP

			mario.animations.hammering = {
				duration: 1000000000,
				animate() {
					mario.actions = holding;
                    mario["power-ups"].holding = true;
                    //console.log(mario["power-ups"])
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
	pickupTP(entities);

	return entities;
};
