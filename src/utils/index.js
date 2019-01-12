import Matter from "matter-js";
import _ from "lodash";

const remove = (id, entities) => {
	if (entities[id].body)
		Matter.Composite.remove(entities.physics.world, entities[id].body);

	delete entities[id];
};

const height = ({ body: { bounds } }) => bounds.max.y - bounds.min.y;

const width = ({ body: { bounds } }) => bounds.max.x - bounds.min.x;

const position = ({ body }) => body.position;

const shift = ({ x, y }, dx = 0, dy = 0) => ({x: x + dx, y: y + dy });

const base = ({ body }) => ({
	x: body.position.x,
	y: body.position.y + height({ body }) / 2
});

const top = ({ body }) => ({
	x: body.position.x,
	y: body.position.y - height({ body }) / 2
});

const left = ({ body }) => ({
	x: body.position.x - width({ body }) / 2,
	y: body.position.y
});

const right = ({ body }) => ({
	x: body.position.x + width({ body }) / 2,
	y: body.position.y
});

const topLeft = ({ body }) => ({
	x: body.position.x - width({ body }) / 2,
	y: body.position.y - height({ body }) / 2
});

const topRight = ({ body }) => ({
	x: body.position.x + width({ body }) / 2,
	y: body.position.y - height({ body }) / 2
});

const distance = ({x: x1, y: y1 }, { x: x2, y: y2 }) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const canCollide = ({ body: b1 }, { body: b2 }) => {
	return (b1.collisionFilter.category & b2.collisionFilter.mask) !== 0 &&
		   (b1.collisionFilter.mask & b2.collisionFilter.category) !== 0;
};

const containsPosition = ({ body }, pos) => {
	let collisions = Matter.Query.point([body], pos);
	return collisions && collisions.length > 0;
};

const contains = (e1, e2) => {
	return containsPosition(e1, position(e2))
};

const any = (arr = [], b = "", c) => {
	if (c) {
		if (Array.isArray(c) === false) c = [c];

		return _.isFunction(b)
			? _.intersection(arr.map(b), c).length > 0
			: _.intersection(arr.map(x => x[b]), c).length > 0;
	}

	if (!b) return arr.length > 0;

	if (Array.isArray(b)) return _.intersection(a, b).length > 0;

	if (_.isFunction(b)) return arr.find(b);

	return arr.indexOf(b) > -1;
};

const falsey = (arg = "") => {
	return !arg;
};

const truthy = (arg = "") => {
	return !!arg;
};

module.exports = {
	remove,
	position,
	pos: position,
	shift,
	height,
	width,
	base,
	top,
	left,
	right,
	topLeft,
	topRight,
	distance,
	canCollide,
	containsPosition,
	collide: containsPosition,
	contains,
	any,
	falsey,
	truthy,
	not: falsey,
	all: _.every,
	find: _.find,
	filter: _.filter
};
