import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Platform2Down from "../components/platform2Down";
import PlatGrass from "../components/platformGrass";
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

        // Tilemapping for the top level of the floor platform / FLOOR
        floorLevelOne: Platform(
            world,
            { 
                x: cx + 160, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR2
        floorLevelTwodown: Platform2Down(
            world,
            { 
                x: cx + 177, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR3
        floorLevelThreedown: Platform2Down(
            world,
            { 
                x: cx + 188, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform / FLOOR4
        floorLevelThreedown: Platform2Down(
            world,
            { 
                x: cx + 197, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping platform for top left potty / LEFT POTTY
        // pottyLeftTop: Platform(
        //     world,
        //     { 
        //         x: cx - 100, 
        //         y: offsetY + 720 
        //     },
        //     -1.5708,
        //     platformWidth * 0.2
        // ),

        // Tilemapping for second level down from left potty / LEFT POTTY
        // pottyLeftLevelTwodown: PlatGrass(
        //     world,
        //     { 
        //         x: cx - 85, 
        //         y: offsetY + 720
        //     },
        //     -1.5708,
        //     platformWidth * 0.2
        // ),

        // Tilemapping platform for top right potty / RIGHT POTTY
        // pottyrightTop: Platform(
        //     world,
        //     { 
        //         x: cx - 100, 
        //         y: offsetY + 115 
        //     },
        //     -1.5708,
        //     platformWidth * 0.2
        // ),

        // Tilemapping for second level down from the right potty / RIGHT POTTY
        // pottyrightLevelTwodown: PlatGrass(
        //     world,
        //     { 
        //         x: cx - 85, 
        //         y: offsetY + 115 
        //     },
        //     -1.5708,
        //     platformWidth * 0.2
        // ),

        // Tilemapping platform middle of the screen / BOTTOM RIGHT PLATFORM
        middleOfScreen: PlatGrass(
            world,
            { 
                //up and down
                x: cx + 111, 
                // left and right
                y: offsetY + 140
            },
            -1.5708,
            platformWidth * 0.1
        ),

        // Tilemapping platform middle of the screen / BOTTOM RIGHT PLATFORM 2
        middleOfScreen2: PlatGrass(
            world,
            { 
                //up and down
                x: cx + 80, 
                // left and right
                y: offsetY + 200
            },
            -1.5708,
            platformWidth * 0.1
        ),

        // Tilemapping platform middle of the screen / MIDDLE PLATFORM
        middleLeftOfScreen: PlatGrass(
            world,
            { 
                //up and down
                x: cx + 50, 
                // left and right
                y: offsetY + 410
            },
            -1.5708,
            platformWidth * 0.70
        ),

        // Tilemapping platform middle of the screen / BOTTOM LEFT PLATFORM
        leftPlatform: PlatGrass(
            world,
            { 
                //up and down
                x: cx + 111, 
                // left and right
                y: offsetY + 690
            },
            -1.5708,
            platformWidth * 0.1
        ),

        // Tilemapping platform middle of the screen / BOTTOM LEFT PLATFORM 2
        leftPlatform2: PlatGrass(
            world,
            { 
                //up and down
                x: cx + 80, 
                // left and right
                y: offsetY + 620
            },
            -1.5708,
            platformWidth * 0.1
        ),

        // Tilemapping platform middle of the screen / MIDDLE PLATFORM
        // middleLeftOfScreen2: PlatGrass(
        //     world,
        //     { 
        //         //up and down
        //         x: cx + 80, 
        //         // left and right
        //         y: offsetY + 470
        //     },
        //     -1.5708,
        //     platformWidth * 0.2
        // ),

        // Left barrier of landscap map
        leftBarrier: Barrier(
            world,
            {  
                x: cx - platformWidth / 2 + 10,
                y: cy 
            }, 
            height
        ),
        // RIght barrier of landscap map
        rightBarrier: Barrier(
            world,
            {
                x: cx + platformWidth / 2 - 10,
                y: cy
            },
            height
        ),

        mario: Mario(world, { x: cx +20, y: 600 }),
        dino2: Mario(world, { x: cx + 20, y: 70 })
    };
};
