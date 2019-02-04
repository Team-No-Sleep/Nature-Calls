import Matter from "matter-js";
import { distance, base, position, any } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

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
