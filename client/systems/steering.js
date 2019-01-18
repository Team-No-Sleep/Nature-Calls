
export default (entities, { events }) => {
	let mario = entities.mario;
	let { swipeLeft, swipeRight, swipeUp, swipeDown } = mario.controls.gestures

	let vertical = [
		{ if: swipeLeft, then: "up" },
		{ if: swipeRight, then: "down" },
		{ if: true, then: mario.direction.vertical }
	];

	let horizontal = [
		{ if: swipeUp, then: "right" },
		{ if: swipeDown, then: "left" },
		{ if: true, then: mario.direction.horizontal }
	];

	mario.direction.horizontal = horizontal.find(x => x.if).then;
	mario.direction.vertical = vertical.find(x => x.if).then;

	return entities;
};
