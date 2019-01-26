import Matter from "matter-js";
import {distance, position} from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import ToiletPaper from "../components/toiletPaper";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;

const MarioIdling = resolveAssetSource(
	require("../components/mario/mario-idling.gif")
);
const MarioWalking = resolveAssetSource(
	require("../components/mario/mario-walking.gif")
);
const MarioJumping = resolveAssetSource(
	require("../components/mario/mario-jumping.gif")
);
const score = entities => {

    let mario = entities.mario;
    let dino2 = entities.dino2;
    const marioLocation = mario.body.position;
    const dino2Location = dino2.body.position;
    //console.log(mario["power-ups"].holding)

    //console.log(marioLocation)
    if (mario || dino2) {
        let leftPotty = {x: 62.6, y: 614};
        let rightPotty = {x: 62.6, y: 38};
        let scored;

        if (mario["power-ups"].holding && distance(marioLocation, leftPotty) < 20) {
            console.log("Mario scores!");
            mario["power-ups"].holding = false;
            console.log(mario["power-ups"].holding)
            mario.actions = {
                ...mario.actions,
                idling: MarioIdling,
                walking: MarioWalking,
                jumping: MarioJumping
            };
            mario.score++;
            console.log(mario.score)
            console.log(dino2.score)
            scored = true; 


        } 
        if (dino2["power-ups"].holding && distance(dino2Location, rightPotty) < 20) {
            console.log("Dino2 scores!");
            dino2["power-ups"].holding = false;
            console.log(dino2["power-ups"].holding)
            dino2.actions = {
                ...dino2.actions,
                idling: MarioIdling,
                walking: MarioWalking,
                jumping: MarioJumping
            };
            dino2.score++;
            scored = true;
        }
        if (scored) {
            entities.toiletPaper = ToiletPaper( {x: cy + 125, y: cy} )
        }

    }



}

const win = entities => {
    let mario = entities.mario;
    let dino2 = entities.dino2;

     //console.log(mario.score);
    // console.log(dino2.score);
    if (mario.score >= 3) 
        console.log("mario won!");
   

}


export default (entities, {events, dispatch}) => {
    score(entities);
    win(entities);
    return entities;
};
