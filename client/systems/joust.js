import Matter from "matter-js";
import {distance, position} from "../utils";
import  resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import Mario from "../components/mario"


const joust = entities => {

    let mario = entities.mario;
    let dino2 = entities.dino2;
    if (mario && dino2) {
        if( distance(mario.body.position, dino2.body.position) < 20) {
            console.log("they are touching");
            // console.log(mario.body.position.y);
            if (mario.body.position.y > dino2.body.position.y && !mario["power-ups"].holding) {
                console.log("mario kills dino2")
                // placeholder delete
                delete entities.dino2;
                entities.dino2 = Mario(entities.physics.world, {x:  250, y: 65 });


                //respawn(dino2);
            } else if (mario.body.position.y < dino2.body.position.y  && !dino2["power-ups"].holding) {
                console.log("dino2 kills mario")
                delete entities.mario
                entities.mario = Mario(entities.physics.world, { x: 250, y: 600 });


                // respawn(mario);????

            }

        }
    }
}



    export default (entities, {events, dispatch}) => {
        joust(entities);

        return entities;
    };



