import Matter from "matter-js";
import _ from "lodash";
import { base, containsPosition, shift, distance, position } from "./index.js";

const standing = (platform, other) => {
	let basePos = base(other);
	let min = other.body.bounds.min.x;
	let max = other.body.bounds.max.x;

	// Or just check if lines cross?
	// Or check if point is above line?
	return (
		containsPosition(platform, { x: min, y: basePos.y + 5 }) ||
		containsPosition(platform, { x: max, y: basePos.y + 5 })
	);
};

const closestAbove = (platforms = [], other) => {
	let otherPos = position(other);
	let above = platforms.filter(x => x.body.position.y <= otherPos.y);

	return _.sortBy(above, x => {
		return distance(position(x), otherPos);
	})[0];
};

const closestBelow = (platforms = [], other) => {
	let otherPos = position(other);
	let below = platforms.filter(x => x.body.position.y >= otherPos.y);

	return _.sortBy(below, x => {
		return distance(position(x), otherPos);
	})[0];
};

const aboveTopEdge = ({ platform }, { x, y }) => {
	let [v1, v2] = platform.vertices;
	let m = (v2.y - v1.y) / (v2.x - v1.x);
	let b = v1.y - m * v1.x;
	return y < m * x + b;
};

const aboveBottomEdge = ({ platform }, { x, y }) => {
	let [_1, _2, v1, v2] = platform.vertices;
	let m = (v2.y - v1.y) / (v2.x - v1.x);
	let b = v1.y - m * v1.x;
	return y < m * x + b;
};

module.exports = {
	standing,
	closestAbove,
	closestBelow,
	aboveTopEdge,
	aboveBottomEdge
};
