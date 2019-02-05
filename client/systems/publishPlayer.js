import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://localhost:3001');
let lastUpdate = "";

export default (entities, { events }) => {
    let mario = entities.mario;
    let dino2 = entities.dino2;
    let chosenCharacter;
    // console.log(mario.isPlayerCharacter);
    if (mario.isPlayerCharacter === true) {
        chosenCharacter = mario;
    } else if (dino2.isPlayerCharacter === true) {
        chosenCharacter = dino2;
    }
    //handles dinos dying
    if(chosenCharacter === null){
        return entities;
    }
    let nextUpdate = {
        x: chosenCharacter.body.position.x.toFixed(1),
        y: chosenCharacter.body.position.y.toFixed(1),
        dino: chosenCharacter.characterId
    };
    let nextUpdateStr = JSON.stringify(nextUpdate);
    if(nextUpdateStr !== lastUpdate){

        //socket.emit('position', nextUpdate); // emits chosen character x and y coordinates the only dino that moves at the moment
        
        lastUpdate = nextUpdateStr;
    }
    
    return entities;
};
