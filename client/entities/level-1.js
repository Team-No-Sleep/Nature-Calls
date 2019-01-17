import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Barrier from "../components/barrier";
import Mario from "../components/mario";

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

        platform: Platform(
            world,
            { 
                x: cx, 
                y: offsetY + 405 
            },
            0,
            platformWidth * 1
        ),

        leftBarrier: Barrier(
            world,
            {  
                x: cx - platformWidth / 2 + 10,
                y: cy 
            },
            height
        ),

        rightBarrier: Barrier(
            world,
            {
                x: cx + platformWidth / 2 - 10,
                y: cy
            },
            height,
        ),

        mario: Mario(world, { x: cx, y: offsetY + 405 - 20 / 2 - 20 }),
    };
};
