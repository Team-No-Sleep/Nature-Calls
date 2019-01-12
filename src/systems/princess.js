import { base, distance } from "../utils";

const rescuePrincess = (entities, dispatch) => {
	let mario = entities.mario;
	let princess = entities.princess;
	let marioBase = base(mario);

	if (distance(marioBase, princess.position) < 30)
		dispatch({ type: "princess-rescued" });
};

export default (entities, { dispatch }) => {
	rescuePrincess(entities, dispatch);

	return entities;
};
