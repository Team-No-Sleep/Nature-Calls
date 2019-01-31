import Matter from "matter-js";
<<<<<<< HEAD
// import MarioIdling from "./mario-idling.gif";
=======
import MarioIdling from "../components/mario/mario-idling.gif";
>>>>>>> 929fd21a5fa30ec1a2be06b8ccc3a7ef759b0118


let position = {};
const socketInformation = () => {
    // Take in opponent's  information from the socket

    // position =  {x: 5/* socket.x? */, y: 2 /* socket.y */};
    // gif = socket.gif/* opponent's gif */;
    // holdingTP = socket.holdingTP; /* if opponent is holding TP */
    // score = socket.score;


}


const renderOpponentPosition = entities => {
    /* TODO: 
        1. Check if this player is player 1 or player 2 based on socket id
        
        if (player1) {
            entities.dino2.body.position = position;
            entities.dino2.gif = gif 
        } else {
            entities.mario.body.position = position;
            entities.dino2.gif = gif;
        }

        */
}















export default (entities, { events, dispatch }) => {
    socketInformation();
    renderOpponentPosition(entities);

	return entities;
};