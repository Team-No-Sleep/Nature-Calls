
export default (entities, { screen }) => {
	let mario = entities.mario;
	let princess = entities.princess;
	let camera = entities.camera;
	let targetY = princess.position.y + camera.offsetY;
	let anchorY = screen.height * 0.65;
	let diff = anchorY - mario.body.position.y - camera.offsetY;

	if (targetY < 150 || diff < 0) {
		camera.offsetY += diff * 0.05;
	}

	return entities;
}