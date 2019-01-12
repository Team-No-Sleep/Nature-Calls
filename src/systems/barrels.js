import Matter from "matter-js";
import Barrel, { Special } from "../components/barrel";
import {
	filter,
	any,
	find,
	base,
	left,
	right,
	collide,
	topLeft,
	topRight
} from "../utils";
import { closestBelow, aboveTopEdge } from "../utils/platforms";
import { nearTop } from "../utils/ladders";
import { crack } from "../utils/barrels";

let barrelCount = 0;

const createBarrels = (entities, events) => {
	let toss = events.find(e => e.type === "toss");

	if (toss) {
		let kong = entities.kong;
		let world = entities.physics.world;
		let cons = Math.random() < 0.3 ? Special : Barrel;

		entities[`barrel-${barrelCount++}`] = cons(world, {
			x: kong.body.position.x + 45,
			y: kong.body.position.y + 20
		});
	}
};

const headButtBarrels = (entities, dispatch) => {
	let mario = entities.mario;
	let barrelKeys = Object.keys(entities).filter(
		key =>
			entities[key].barrel &&
			entities[key].barrel.special &&
			!entities[key].animations.rollingDownLoadder
	);

	barrelKeys.forEach(key => {
		let b = entities[key];
		let start = topLeft(mario);
		let end = topRight(mario);
		let collisions = Matter.Query.ray([mario.body, b.body], start, end);

		if (collisions.length)
			crack(key, entities, dispatch)
	});

	return entities;
};

const rollDownLadders = entities => {
	let ladders = filter(entities, e => e.ladder && e.ladder.acceptBarrels);
	let platforms = filter(entities, "platform");
	let barrels = filter(entities, "barrel").filter(
		b =>
			!b.animations.rollingDownLoadder && any(ladders, l => nearTop(l, b))
	);

	barrels.forEach(b => {
		//-- Decide whether a barrel goes down a ladder or not..
		//-- This is terrible - probably want something a little more deterministic here..
		if (Math.random() < 0.98) return;

		let ladder = find(ladders, l => nearTop(l, b));
		let platform = closestBelow(platforms, ladder);

		b.animations.rollingDownLoadder = {
			animate(_, args) {
				b.action = "on-ladder";
				b.size = { width: 40, height: 25 };
				Matter.Sleeping.set(b.body, true);
				Matter.Body.setPosition(b.body, {
					x: ladder.body.position.x,
					y: b.body.position.y + 1.5
				});
			},
			while: (_, args) => {
				return aboveTopEdge(platform, base(b));
			},
			complete() {
				b.action = "on-platform";
				b.size = { width: 25, height: 25 };
				Matter.Sleeping.set(b.body, false);
			}
		};
	});
};

const knockOverMario = (entities, dispatch) => {
	let mario = entities.mario;
	let barrels = filter(entities, "barrel");

	barrels.forEach(b => {
		if (
			(b.action == "on-ladder" && collide(mario, base(b))) ||
			(b.action == "on-platform" &&
				(collide(mario, left(b)) || collide(mario, right(b))))
		) {
			mario.action = "dead";
			dispatch({ type: "game-over" });
		}
	});
};

export default (entities, { events, dispatch }) => {
	knockOverMario(entities, dispatch);
	createBarrels(entities, events);
	headButtBarrels(entities, dispatch);
	rollDownLadders(entities);

	return entities;
};
