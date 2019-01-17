import React, { Component } from "react";
import Matter from "matter-js";
import { collisionCategories } from "../utils/constants";

export default (world, pos, height, mask = collisionCategories.mario) => {
	let width = 20;
	let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
		isStatic: true,
		collisionFilter: {
			category: collisionCategories.barrier,
			mask: mask
		}
	});
	Matter.World.add(world, [body]);
	return {
		body,
		size: { width, height }
	};
};
