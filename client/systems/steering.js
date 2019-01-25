
export default (entities, { events }) => {
	let mario = entities.mario;
	let dino2 = entities.dino2;

	let characters = [mario, dino2];
	for (let char of characters) {


	let { holdLeft, holdRight, swipeUp, swipeDown } = char.controls.gestures

	let horizontal = [
		{ if: holdLeft, then: "left" },
		{ if: holdRight, then: "right" },
		{ if: true, then: char.direction.horizontal }
	];

	let vertical = [
		{ if: swipeUp, then: "up" },
		{ if: swipeDown, then: "down" },
		{ if: true, then: char.direction.vertical }
	];

	char.direction.horizontal = horizontal.find(x => x.if).then;
	char.direction.vertical = vertical.find(x => x.if).then;

	}	

	return entities;
};




