
export default (entities, { events }) => {
	let mario = entities.mario;
        let dino2 = entities.dino2;
        let chosenCharacter = null;
        // console.log(mario.isPlayerCharacter);
        if (mario.isPlayerCharacter === true) {
            chosenCharacter = mario;
        } else if (dino2.isPlayerCharacter === true) {
            chosenCharacter = dino2;
        }
			if(chosenCharacter) { 
	// TODO: Make better data structure for holding which characters are alive
		
				let { holdLeft, holdRight, swipeUp, swipeDown } = chosenCharacter.controls.gestures

				let horizontal = [
					{ if: holdLeft, then: "left" },
					{ if: holdRight, then: "right" },
					{ if: true, then: chosenCharacter.direction.horizontal }
				];

				let vertical = [
					{ if: swipeUp, then: "up" },
					{ if: swipeDown, then: "down" },
					{ if: true, then: chosenCharacter.direction.vertical }
				];

				chosenCharacter.direction.horizontal = horizontal.find(x => x.if).then;
				chosenCharacter.direction.vertical = vertical.find(x => x.if).then;
			}
		

	return entities;
};




