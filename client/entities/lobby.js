import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Platform2Down from "../components/platform2Down";
import MiniRockRight from "../components/miniFloatingRock";
import MiniRockLeft from "../components/miniFloatingRockLeft";
import PlatGrass from "../components/platformGrass";
import Barrier from "../components/barrier";
import Mario from "../components/mario";
import ToiletPaper from "../components/toiletPaper";
import Outhouse from "../components/outhouse";


export default restart => {
    //-- Cleanup existing entities..
    if (restart) Matter.Engine.clear(restart.physics.engine);

    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity = { x: 1.5, y: 0 };

    return {
        physics: { engine: engine, world: world },

        floorLevelOne: Platform(
            world,
            { 
                x: cy + 160, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR2
        floorLevelTwodown: Platform2Down(
            world,
            { 
                x: cy + 177, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR3
        floorLevelThreedown: Platform2Down(
            world,
            { 
                x: cy + 188, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR4
        floorLevelThreedown: Platform2Down(
            world,
            { 
                x: cy + 197, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        mario: Mario(world, { x: cy +20, y: 600 }),
       // dino2: Mario(world, { x: cy + 20, y: 70 })

        };
    };