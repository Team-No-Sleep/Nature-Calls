import Matter from "matter-js";
import {distance, position} from "../utils";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import ToiletPaper from "../components/toiletPaper";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;

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
            // mario.actions = {
            //     ...mario.actions,
            //     idling: mario.actions.idling,
            //     walking: mario.actions.walking,
            //     jumping: mario.actions.jumping
            // };
            console.log(mario.actions.idlindg);
            mario.score++;
            console.log(mario.score)
            console.log(dino2.score)
            scored = true; 


        } 
        if (dino2["power-ups"].holding && distance(dino2Location, rightPotty) < 20) {
            console.log("Dino2 scores!");
            dino2["power-ups"].holding = false;
            console.log(dino2["power-ups"].holding)
            // dino2.actions = {
            //     ...dino2.actions,
            //     idling: dino2.actions.idling,
            //     walking: dino2.actions.walking,
            //     jumping: dino2.actions.jumping
            // };
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
