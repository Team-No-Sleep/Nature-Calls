import Matter from "matter-js";
import { distance, position } from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import { Dimensions } from "react-native";
import Mario from "../components/mario";

const { width, height } = Dimensions.get("window");
const cx = width / 2;
const cy = height / 2;

const score = (entities, socket) => {
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
    data = {
        score: chosenCharacter.score,
        characterId: chosenCharacter.characterId
    }
    socket.emit("score", data);

    if (chosenCharacter) {
        const chosenCharacterLocation = chosenCharacter.body.position;
        let scored;

        if (chosenCharacter["power-ups"].holding && distance(chosenCharacterLocation, chosenPotty) < 32) {
            // if (mario["power-ups"].holding ) {
            console.log(chosenCharacter, "scores!");
            chosenCharacter["power-ups"].holding = false;
            console.log(chosenCharacter["power-ups"].holding)
            chosenCharacter.score++;
            console.log("mario score is " + mario.score);
            console.log("dino2 score is" + dino2.score)
            scored = true;
        }
        if (scored) {
            //entities.toiletPaper = ToiletPaper({ x: cy + 125, y: cy })
            socket.emit("tp-status-change", "");
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
    if (mario.score >= 3) {
        dispatch({ type: 'dino1-wins' });
    } else if (dino2.score >= 3) {
        dispatch({ type: 'dino2-wins'});
    }
}

const fall = (entities, socket) => {
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
            socket.emit("tp-status-change", "");
            //entities.toiletPaper = ToiletPaper({ x: cy + 125, y: cy });
        }
    }
}

export default (socket) => {
    return (entities, { events, dispatch }) => {
        score(entities, socket);
        win(dispatch, entities);
        fall(entities, socket)
        return entities;
    }
};
