
export default (entities, { events }) => {
	let mario = entities.mario;
	let { swipeLeft, swipeRight, swipeUp, swipeDown } = mario.controls.gestures

	let horizontal = [
		{ if: swipeLeft, then: "left" },
		{ if: swipeRight, then: "right" },
		{ if: true, then: mario.direction.horizontal }
	];

	let vertical = [
		{ if: swipeUp, then: "up" },
		{ if: swipeDown, then: "down" },
		{ if: true, then: mario.direction.vertical }
	];

	mario.direction.horizontal = horizontal.find(x => x.if).then;
	mario.direction.vertical = vertical.find(x => x.if).then;

	return entities;
};
