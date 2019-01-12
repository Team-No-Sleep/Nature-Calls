let lastToss = null;
let lastTantrum = null;

const toss = (dispatch, time) => {
	lastToss = time.current;
	dispatch({ type: "toss" });
	return {
		duration: 400,
		animate(kong) {
			kong.action = "tossing";
		}
	};
};

const tantrum = time => {
	lastTantrum = time.current;
	return {
		duration: 2500,
		animate(kong, percent) {
			kong.action = "tantrum";
		}
	};
};

export default (entities, { time, dispatch }) => {
	let kong = entities.kong;

	if (lastToss == null || lastTantrum == null) {
		lastToss = lastTantrum = time.current;
		setTimeout(() => {
			kong.animations.tantrum = toss(dispatch, time);
		}, 500);
	}

	if (kong.animations.toss || kong.animations.tantrum) return entities;

	if (time.current - lastToss > 3000)
		kong.animations.toss = toss(dispatch, time);
	else if (time.current - lastTantrum > 4000)
		kong.animations.tantrum = tantrum(time);
	else kong.action = "idling";

	return entities;
};
