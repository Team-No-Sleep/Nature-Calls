import Matter from "matter-js";
import { distance, position } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import ToiletPaper from "../components/toiletPaper";
import { Dimensions } from "react-native";
import Mario from "../components/mario";

const { width, height } = Dimensions.get("window");
const cx = width / 2;
const cy = height / 2;

const score = entities => {
    let mario = entities.mario;
    let dino2 = entities.dino2;
    let chosenCharacter = null;
    let chosenPotty = null;
    // console.log(mario.isPlayerCharacter);
    if (mario.isPlayerCharacter === true) {
        chosenCharacter = mario;
        chosenPotty = entities.outhouse2.position;
    } else if (dino2.isPlayerCharacter === true) {
        chosenCharacter = dino2;
        chosenPotty = entities.outhouse.position;
    }
    //console.log(mario["power-ups"].holding)

    if (chosenCharacter) {
const chosenCharacterLocation = chosenCharacter.body.position;
        let scored;

        if (chosenCharacter["power-ups"].holding && distance(chosenCharacterLocation, chosenPotty) < 32) {
            // if (mario["power-ups"].holding ) {
            console.log(chosenCharacter, "scores!");
            chosenCharacter["power-ups"].holding = false;
            console.log(chosenCharacter["power-ups"].holding)
            chosenCharacter.score++;
            console.log(chosenCharacter.score);
            scored = true;
        }
        if (scored) {
            entities.toiletPaper = ToiletPaper({ x: cy + 125, y: cy })
        }

    }
}

const win = (dispatch, entities) => {
    let mario = entities.mario;
    let dino2 = entities.dino2;
    let chosenCharacter = null;
    if (mario.isPlayerCharacter === true) {
        chosenCharacter = mario;
    } else if (dino2.isPlayerCharacter === true) {
        chosenCharacter = dino2;
    }
    if (chosenCharacter.score === 3) {
        dispatch({ type: `${chosenCharacter.characterId}-wins`});
    }
}

const fall = (entities) => {
    //console.log(entities.mario.body.position.x >= height)
    let mario = entities.mario;
    let dino2 = entities.dino2;
    let chosenCharacter = null;
    if (mario.isPlayerCharacter === true) {
        chosenCharacter = mario;
    } else if (dino2.isPlayerCharacter === true) {
        chosenCharacter = dino2;
    }
    // let mario = entities.mario;
    // let dino2 = entities.dino2;
    let tpDropped;

    if (chosenCharacter) {

        if (chosenCharacter.body.position.x >= height) {
            let score = chosenCharacter.score;
            if (chosenCharacter["power-ups"].holding) {
                tpDropped = true;
            }
            let marioColor = chosenCharacter.color;
            let isPlayerCharacter = chosenCharacter.isPlayerCharacter;
            let characterId = chosenCharacter.characterId;
            delete entities[characterId];
            entities[characterId] = Mario(entities.physics.world, { x: 250, y: 600 }, marioColor, isPlayerCharacter, characterId);
            entities[characterId].score = score;
        }

        if (tpDropped) {

            entities.toiletPaper = ToiletPaper({ x: cy + 125, y: cy });
        }
    }
}

export default (entities, { events, dispatch }) => {
    score(entities);
    win(dispatch, entities);
    fall(entities)
    return entities;
};
