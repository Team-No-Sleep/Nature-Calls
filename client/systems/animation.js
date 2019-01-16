import _ from "lodash";

const start = (animations, time) => {
	animations.forEach(a => {
		if (a.animation.duration && !a.animation.start) {
			a.animation.start = time.current;
		}
	});
};

const animate = (animations, time) => {
	//-- Timed animations
	animations.filter(a => a.animation.start <= time.current).forEach(a => {
		let percent = (time.current - a.animation.start) / a.animation.duration;

		if (percent <= 1) {
			a.animation.animate(a.entity, percent, a.animation.args);
		} else {
			if (a.animation.complete) a.animation.complete(a.entity); //-- Notify completion
			delete a.entity.animations[a.key]; //-- Cleanup
		}
	});

	//-- Conditional animations
	animations.filter(a => a.animation.while).forEach(a => {
		if (a.animation.while(a.entity, a.animation.args)) {
			a.animation.animate(a.entity, a.animation.args);
		} else {
			if (a.animation.complete) a.animation.complete(a.entity);
			delete a.entity.animations[a.key];
		}
	});
};

export default (entities, { time, events }) => {
	let animations = _.flatten(
		Object.keys(entities)
			.filter(key => entities[key].animations)
			.map(key => entities[key])
			.map(e =>
				_.map(e.animations, (v, k) => ({
					entity: e,
					key: k,
					animation: v
				}))
			)
	);

	start(animations, time);
	animate(animations, time);

	return entities;
};
