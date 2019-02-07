import Matter from "matter-js";
import { distance, base, position, any } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

let powerUpId = 0;

const pickupTP = entities => {
	let mario = entities.mario;
	let dino2 = entities.dino2;
	let chosenCharacter = null;
	// console.log(mario.isPlayerCharacter);
	if (mario.isPlayerCharacter === true) {
		chosenCharacter = mario;
	} else if (dino2.isPlayerCharacter === true) {
		chosenCharacter = dino2;
	}
	// TODO: Add so dino2 can also

	let tpKeys = Object.keys(entities).filter(k => entities[k].ToiletPaper);
	tpKeys.forEach(k => {
		let tp = entities[k];
		//console.log(distance(tp.position, mario.body.position));
		if (chosenCharacter) {
			if (distance(tp.position, chosenCharacter.body.position) < 20) {
				console.log("tp picked up")
				chosenCharacter["power-ups"].holding = true;
				delete entities[k];
			}
		}
	});
};

export default (entities, { events, dispatch }) => {
	pickupTP(entities);

	return entities;
};
