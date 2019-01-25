import Matter from "matter-js";
import { distance, base, position, any } from "../utils";
import Mario from "../components/mario"
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const MarioIdling = resolveAssetSource(
	require("../components/mario/mario-idling.gif")
);
const MarioWalking = resolveAssetSource(
	require("../components/mario/mario-walking.gif")
);
const MarioJumping = resolveAssetSource(
	require("../components/mario/mario-jumping.gif")
);
const MarioIdlingHammering = resolveAssetSource(
	require("../components/mario/mario-idling-hammering.gif")
);
const MarioWalkingHammering = resolveAssetSource(
	require("../components/mario/mario-walking-hammering.gif")
);
const MarioJumpingHammering = resolveAssetSource(
	require("../components/mario/mario-walking-hammering.gif")
);
let powerUpId = 0;

const pickupTP = entities => {
	
	// TODO: Add so dino2 can also
	let mario = entities.mario;
	let dino2 = entities.dino2
	
	let tpKeys = Object.keys(entities).filter(k => entities[k].ToiletPaper);
	tpKeys.forEach(k => {
        
        let tp = entities[k];
		//console.log(distance(tp.position, mario.body.position));
		
		let characters = [mario, dino2];
		for (let char of characters) {
			if(char) { 
				if (distance(tp.position, char.body.position) < 20) {
					console.log("tp picked up")
					let holding = {
						...char.actions,
						// ***** need new gif here? ***** //
						idling: MarioIdlingHammering,
						walking: MarioWalkingHammering,
						jumping: MarioJumpingHammering
					};
					
					// I guess here we need new gifs for holding the TP

					char.animations.hammering = {
						duration: 1000000000,
						animate() {
							char.actions = holding;
							char["power-ups"].holding = true;
							//console.log(char["power-ups"])
						},
						complete() {
							char.actions = {
								...char.actions,
								idling: MarioIdling,
								walking: MarioWalking,
								jumping: MarioJumping
							};
							char["power-ups"].holding = false;
						}
					};

					delete entities[k];
				}
			}
		}
	});
};

export default (entities, { events, dispatch }) => {
	pickupTP(entities);

	return entities;
};
