import Matter from "matter-js";
import { Dimensions } from "react-native";
let position = {};

export default (playersFromServer)=>{
    return (entities, { events, dispatch }) => {/* TODO: 
        1. Check if this player is player 1 or player 2 based on socket id
        
        if (player1) {
            entities.dino2.body.position = position;
            entities.dino2.gif = gif 
        } else {
            entities.mario.body.position = position;
            entities.dino2.gif = gif;
        }

        *///console.log("players from server", playersFromServer );
       let mario = entities.mario;
        let dino2 = entities.dino2;
        let chosenCharacter = null;
        let chosenUpdate = null;
        let chosenUpdateScore = 0;
        // console.log(mario.isPlayerCharacter);
        if (mario.isPlayerCharacter === false) {
            chosenUpdate = playersFromServer["mario"];
            chosenUpdateScore = playersFromServer[mario.characterId + "-score"];
            chosenCharacter = mario;
        } else if (dino2.isPlayerCharacter === false) {
            chosenUpdate = playersFromServer["dino2"];
            chosenUpdateScore = playersFromServer[dino2.characterId + "-score"];
            chosenCharacter = dino2;
        }
        //handles dinos dying
        if (!chosenCharacter || !chosenUpdate) {
            return entities;
        } else{

            //console.log(chosenCharacter);
            //console.log(chosenUpdate);
            //chosenCharacter.body.position.x = chosenUpdate.x;
            //chosenCharacter.body.position.y = chosenUpdate.y;
            //chosenCharacter.body.position =  chosenUpdate.position;
            
            // let currentScreenWidth = Dimensions.get("window").width;
            // let currentScreenHeight = Dimensions.get("window").height;
            // chosenUpdate.position.y = scaleCoordinates(chosenUpdate.position.y, chosenUpdate.screenWidth, currentScreenWidth);
            // chosenUpdate.position.x = scaleCoordinates(chosenUpdate.position.x, chosenUpdate.screenHeight, currentScreenHeight);
            Matter.Body.setPosition(chosenCharacter.body, chosenUpdate.position);

            chosenCharacter.action = chosenUpdate.action;
            chosenCharacter.score = chosenUpdateScore;
            // console.log(chosenUpdateScore);
            // console.log(chosenCharacter.score);
            // console.log("dino2 score is" + dino2.score);
            // console.log("mario score is" + mario.score);
            //console.log(chosenCharacter.score);
            //delete playersFromServer[chosenCharacter.characterId];
        }


        return entities;
    };
};
function scaleCoordinates(coordinate, originalDimension, newDimension){
    return coordinate / originalDimension * newDimension;
}