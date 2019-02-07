let lastUpdate = "";
function limiter(wait){
    let isCalled = false;

    return function(fn){
        if (!isCalled){
            fn();
            isCalled = true;
            setTimeout(function(){
                isCalled = false;
            }, wait)
        }
    };
}
export default (socket, user) => {
    let throttle = limiter(500);
    return (entities, { events }) => {
        let mario = entities.mario;
        let dino2 = entities.dino2;
        let chosenCharacter = null;
        // console.log(mario.isPlayerCharacter);
        if (mario.isPlayerCharacter === true) {
            chosenCharacter = mario;
        } else if (dino2.isPlayerCharacter === true) {
            chosenCharacter = dino2;
        }
        //handles dinos dying
        if (chosenCharacter === null) {
            return entities;
        }
        let nextUpdate = {
            x: chosenCharacter.body.position.x.toFixed(1),
            y: chosenCharacter.body.position.y.toFixed(1),
            dino: chosenCharacter.characterId,
            user: user
        };
        let nextUpdateStr = JSON.stringify(nextUpdate);
        if (nextUpdateStr !== lastUpdate) {

            throttle( () => {

                socket.emit('position', {
                    position: chosenCharacter.body.position,
                    dino: chosenCharacter.characterId
                }); // emits chosen character x and y coordinates the only dino that moves at the moment
    console.log(nextUpdate);
                lastUpdate = nextUpdateStr;
            });
        }
        return entities;
    }
};