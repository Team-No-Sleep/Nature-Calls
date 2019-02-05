import Matter from "matter-js";
import {distance, position} from "../utils";
import  resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import Mario from "../components/mario";
import ToiletPaper from "../components/toiletPaper";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;



const joust = entities => {

    let mario = entities.mario;
    let dino2 = entities.dino2;
    let tpDropped;
    if (mario && dino2) {
        if( distance(mario.body.position, dino2.body.position) < 20) {
            console.log("they are touching");
            // console.log(mario.body.position.y);
            if (mario.body.position.y > dino2.body.position.y && !mario["power-ups"].holding) {
                console.log("mario kills dino2")
                let score = dino2.score;
                if (dino2["power-ups"].holding) {
                    tpDropped = true;
                }
                let isPlayerCharacter = dino2.isPlayerCharacter;
                let characterId = dino2.characterId;
                let dino2Color = dino2.color;
                delete entities.dino2;
                entities.dino2 = Mario(entities.physics.world, {x:  250, y: 65 }, dino2Color, isPlayerCharacter, characterId);
                entities.dino2.score = score;

            } else if (mario.body.position.y < dino2.body.position.y  && !dino2["power-ups"].holding) {
                console.log("dino2 kills mario");
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
                console.log("here")


            }

            if (tpDropped) {
                console
                entities.toiletPaper = ToiletPaper( {x: cy + 125, y: cy} );
            }

        }
    }
}



    export default (entities, {events, dispatch}) => {
        joust(entities);

        return entities;
    };



