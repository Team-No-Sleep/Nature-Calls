import Matter from "matter-js";
import {distance, position} from "../utils";
import  resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";


const joust = entities => {

    let mario = entities.mario;
    let dino2 = entities.dino2;

    if( distance(mario.body.position, dino2.body.position) < 20) {
        console.log("they are touching");
        // console.log(mario.body.position.y);
        if (mario.body.position.y > dino2.body.position.y) {
            console.log("mario kills dino2")
            delete entities.dino2;
        } else if (mario.body.position.y < dino2.body.position.y) {
            console.log("dino2 kills mario")
            delete entities.mario

        }

    }
}



    export default (entities, {events, dispatch}) => {
        joust(entities);

        return entities;
    };



