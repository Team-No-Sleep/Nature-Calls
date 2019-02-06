import Matter from "matter-js";
import {distance, position} from "../utils";
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
    const marioLocation = mario.body.position;
    const dino2Location = dino2.body.position;
    //console.log(mario["power-ups"].holding)

    if (mario || dino2) {

        
        let leftPottyLocation = entities.outhouse2.position;
        let rightPottyLocation = entities.outhouse.position
        let scored;


        if (mario["power-ups"].holding && distance(marioLocation, leftPottyLocation) < 32) {
            // if (mario["power-ups"].holding ) {
            console.log("Mario scores!");
            mario["power-ups"].holding = false;
            console.log(mario["power-ups"].holding)

            console.log(mario.actions.idlindg);
            mario.score++;
            console.log(mario.score)
            console.log(dino2.score)
            scored = true; 


        } 
        if (dino2["power-ups"].holding && distance(dino2Location, rightPottyLocation) < 32) {
            console.log("Dino2 scores!");
            dino2["power-ups"].holding = false;
            console.log(dino2["power-ups"].holding)

            dino2.score++;
            scored = true;
        }
        if (scored) {
            entities.toiletPaper = ToiletPaper( {x: cy + 125, y: cy} )
        }

    }
}

const win = (dispatch, entities) => {
    let mario = entities.mario;
    let dino2 = entities.dino2;

     //console.log(mario.score);
    // console.log(dino2.score);
    if (mario.score === 3) {
         dispatch({ type: "dino1-wins" });
    }

    if(dino2.score === 3) {
        dispatch({type: "dino2-wins"});
    }

   

}

const fall = (entities) => {
    console.log(entities.mario.body.position.x >= height)
    let mario = entities.mario;
    let dino2 = entities.dino2;
    let tpDropped;

    if (mario || dino2) {
        
        if (mario.body.position.x >= height) {
            let score = mario.score;
                if (mario["power-ups"].holding) {
                    tpDropped = true;
                }
                let marioColor = mario.color;
                let isPlayerCharacter = mario.isPlayerCharacter;
                let characterId = mario.characterId;
                delete entities.mario
                entities.mario = Mario(entities.physics.world, { x: 250, y: 600 }, marioColor, isPlayerCharacter, characterId);
                entities.mario.score = score;

            }
        

        if (dino2.body.position.x >= height) {
            let score = dino2.score;
                if (dino2["power-ups"].holding) {
                    tpDropped = true;
                }
                let dino2Color = dino2.color;
                let isPlayerCharacter = dino2.isPlayerCharacter;
                let characterId = dino2.characterId;
                delete entities.dino2
                entities.dino2 = Mario(entities.physics.world, { x: 250, y: 600 }, dino2Color, isPlayerCharacter, characterId);
                entities.dino2.score = score;

            }

        if (tpDropped) {
        
            entities.toiletPaper = ToiletPaper( {x: cy + 125, y: cy} );
        }
    }   
}

        

    


export default (entities, {events, dispatch}) => {
    score(entities);
    win(dispatch, entities);
    fall(entities)
    return entities;
};
