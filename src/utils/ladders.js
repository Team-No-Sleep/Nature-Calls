import Matter from "matter-js";
import _ from "lodash";
import { base, top, distance, containsPosition } from "./index.js";

const nearBase = (ladder, other) => {
	let v1 = base(ladder);
	let v2 = base(other);

	return distance(v1, v2) < 20;
};

const nearTop = (ladder, other) => {
	let v1 = top(ladder);
	let v2 = base(other);

	return distance(v1, v2) < 20;
};

const aboveTop = (ladder, other) => {
	let v1 = top(ladder);
	let v2 = base(other);

	return (
		ladder.body.bounds.min.x < v2.x &&
		ladder.body.bounds.max.x > v2.x &&
		v1.y > v2.y &&
		(v1.y - v2.y) < 20
	);
};

const on = (ladder, other) => {
	return containsPosition(ladder, base(other)) || nearTop(ladder, other);
};

const closest = (ladders = [], other) => {
	return _.sortBy(ladders, l => {
		return Math.min(
			distance(base(l), base(other)),
			distance(top(l), base(other))
		);
	})[0]
}

module.exports = {
	nearBase,
	nearTop,
	aboveTop,
	on,
	closest
};
