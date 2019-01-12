import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Barrier from "../components/barrier";
import Ladder from "../components/ladder";
import Mario from "../components/mario";
import Kong from "../components/kong";
import Tile from "../components/common/tile";
import { collisionCategories } from "../utils/constants";
import { filter, any, find } from "../utils";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;
const offsetY = (height - 465) / 2 - 35;
const platformWidth = Math.min(width, 430);

export default restart => {
    //-- Cleanup existing entities..
    if (restart) Matter.Engine.clear(restart.physics.engine);

    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity = { x: 0, y: 2 };

    return {
        physics: { engine: engine, world: world },

        ladder1: Ladder(
            world,
            { x: cx + platformWidth * 0.125 - 12, y: offsetY + 70 },
            50,
            true,
            false,
            "left"
        ),
        ladder2: Ladder(
            world,
            { x: cx + 100 * scale, y: offsetY + 130 },
            60,
            true,
            true,
            "left"
        ),
        ladder3: Ladder(
            world,
            { x: cx - 70, y: offsetY + 200 },
            60,
            true,
            true,
            "right"
        ),
        ladder4: Ladder(world, { x: cx + 70, y: offsetY + 178 }, 36),
        ladder5: Ladder(world, { x: cx + 70, y: offsetY + 230 }, 36),
        ladder6: Ladder(
            world,
            { x: cx + 105 * scale, y: offsetY + 275 },
            50,
            true,
            true,
            "left"
        ),
        ladder7: Ladder(world, { x: cx - 100 * scale, y: offsetY + 243 }, 36),
        ladder8: Ladder(world, { x: cx - 100 * scale, y: offsetY + 295 }, 36),
        ladder9: Ladder(
            world,
            { x: cx - 100 * scale, y: offsetY + 354 },
            60,
            true,
            true,
            "right"
        ),
        ladder10: Ladder(
            world,
            { x: cx, y: offsetY + 352 },
            66,
            true,
            true,
            "right"
        ),
        ladder11: Ladder(
            world,
            { x: cx + 90 * scale, y: offsetY + 430 },
            70,
            true,
            false,
            "left"
        ),

        platform1: Platform(
            world,
            { x: cx, y: offsetY + 35 },
            0,
            platformWidth * 0.25
        ),
        platform2: Platform(
            world,
            { x: cx - 15, y: offsetY + 100 },
            0,
            platformWidth * 0.8
        ),
        platform3: Platform(
            world,
            { x: cx + 15, y: offsetY + 165 },
            -0.07,
            platformWidth * 0.8
        ),
        platform4: Platform(
            world,
            { x: cx - 15, y: offsetY + 240 },
            0.07,
            platformWidth * 0.8
        ),
        platform5: Platform(
            world,
            { x: cx + 15, y: offsetY + 315 },
            -0.07,
            platformWidth * 0.8
        ),
        platform6: Platform(
            world,
            { x: cx - 15, y: offsetY + 390 },
            0.07,
            platformWidth * 0.8
        ),
        platform7: Platform(
            world,
            { x: cx, y: offsetY + 465 },
            0,
            platformWidth * 0.9
        ),

        barrier1: Barrier(
            world,
            { x: cx - platformWidth / 2 + 10, y: cy },
            height
        ),
        barrier2: Barrier(
            world,
            {
                x: cx + platformWidth / 2 - 10,
                y: cy - offsetY - 200
            },
            height
        ),
        barrier3: Barrier(
            world,
            {
                x: cx + platformWidth / 2 - 10,
                y: Math.min(1000, cy - offsetY - 200 + height) // Matter will ignore objects that start outside of a 1000x1000 box
            },
            height,
            collisionCategories.mario
        ),
        oil: {
            source: require("../components/props/oil.gif"),
            position: { x: cx - 140 * scale, y: offsetY + 427 },
            size: { width: 30, height: 56 },
            renderer: <Tile />
        },

        barrelStack: {
            source: require("../components/props/barrel-stack.gif"),
            position: { x: cx - platformWidth * 0.125 + 22, y: offsetY + 67 },
            size: { width: 55, height: 44 },
            renderer: <Tile />
        },

        princess: {
            source: require("../components/props/princess.gif"),
            position: { x: cx, y: offsetY + 2 },
            size: { width: 75, height: 45 },
            renderer: <Tile />
        },

        kong: Kong(world, {
            x: cx - platformWidth * 0.4 + 43,
            y: offsetY + 55
        }),

        mario: Mario(world, { x: cx, y: offsetY + 465 - 20 / 2 - 20 }),

        camera: { offsetY: 0 }
    };
};
