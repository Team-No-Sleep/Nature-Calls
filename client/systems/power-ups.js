import Matter from "matter-js";
import { distance, base, position, any } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

// const MarioIdling = resolveAssetSource(
// 	require("../components/mario/mario-idling.gif")
// );
// const MarioWalking = resolveAssetSource(
// 	require("../components/mario/mario-walking.gif")
// );
// const MarioJumping = resolveAssetSource(
// 	require("../components/mario/mario-jumping.gif")
// );
// const MarioIdlingHammering = resolveAssetSource(
// 	require("../components/mario/mario-idling-hammering.gif")
// );
// const MarioWalkingHammering = resolveAssetSource(
// 	require("../components/mario/mario-walking-hammering.gif")
// );
// const MarioJumpingHammering = resolveAssetSource(
// 	require("../components/mario/mario-walking-hammering.gif")
// );
let powerUpId = 0;

MarioIdlingRed = require( "../components/mario/red/mario-idling.gif");
MarioWalkingRed = require("../components/mario/red/mario-walking.gif");
MarioJumpingRed = require("../components/mario/red/mario-jumping.gif");

MarioIdlingGreen = require( "../components/mario/green/mario-idling.gif");
MarioWalkingGreen = require("../components/mario/green/mario-walking.gif");
MarioJumpingGreen = require("../components/mario/green/mario-jumping.gif");




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
					
					char["power-ups"].holding = true;
					

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
