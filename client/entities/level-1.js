import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform"
import Barrier from "../components/barrier";
import Mario from "../components/mario";

const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;
const offsetY = (height - 465) / 2 -180;
const platformWidth = Math.min(width, 430);

export default restart => {
    //-- Cleanup existing entities..
    if (restart) Matter.Engine.clear(restart.physics.engine);

    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity = { x: 1.5, y: 0 };

    return {
        physics: { engine: engine, world: world },

        floor: Platform(
            world,
            { 
                x: cx + 90, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.5
        ),

        platform: Platform(
            world,
            { 
                x: cx - 90, 
                y: offsetY + 360 
            },
            -1.5708,
            platformWidth * 0.2
        ),

        leftBarrier: Barrier(
            world,
            {  
                x: cx - platformWidth / 2 + 10,
                y: cy 
            }, 
            -1.5708,
            height
        ),

        rightBarrier: Barrier(
            world,
            {
                x: cx + platformWidth / 2 - 10,
                y: cy
            },
            -1.5708,
            height
        ),

        mario: Mario(world, { x: cx + 80, y: offsetY + 405 - 20 / 2 - 20 }),
    };
};
