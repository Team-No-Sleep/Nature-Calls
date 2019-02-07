import Matter from "matter-js";
import { distance, base, position, any } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { Dimensions } from "react-native";
import ToiletPaper from "../components/toiletPaper";

let powerUpId = 0;
const { width, height } = Dimensions.get("window");
const cx = width / 2;
const cy = height / 2;
const pickupTP = (entities, socket) => {
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
				socket.emit("tp-status-change", chosenCharacter.characterId);
			}
		}
	});
};

function handleTpChange(entities, tpHolder) {
	if (tpHolder === "" && !entities.toiletPaper) {
		entities.toiletPaper = ToiletPaper( {x: cy + 125, y: cy} );
		entities["mario"]["power-ups"].holding = false;
		entities["dino2"]["power-ups"].holding = false;
	} else if(tpHolder !== ""){
		//console.log("holder" , tpHolder);
		//console.log(entities[tpHolder]);
		entities["mario"]["power-ups"].holding = false;
		entities["dino2"]["power-ups"].holding = false;
		entities[tpHolder]["power-ups"].holding = true;
		//console.log("take2",entities[tpHolder]);
		if(entities.toiletPaper){
			delete entities.toiletPaper;
		}
	}
}

export default (dataFromServer, socket) => {
	return (entities, { events, dispatch }) => {
		handleTpChange(entities, dataFromServer["tp"]);
		pickupTP(entities, socket);

		return entities;
	}
};
