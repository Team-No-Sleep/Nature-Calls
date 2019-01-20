import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Platform2Down from "../components/platform2Down";
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

        // Tilemapping for the top level of the floor platform
        floorLevelOne: Platform(
            world,
            { 
                x: cx + 125, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping for second level down from the floor platform
        floorLevelTwodown: Platform2Down(
            world,
            { 
                x: cx + 135, 
                y: offsetY + 405 
            },
            -1.5708,
            platformWidth * 1.9
        ),

        // Tilemapping platform for top left potty
        pottyLeftTop: Platform(
            world,
            { 
                x: cx - 100, 
                y: offsetY + 720 
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping for second level down from left potty
        pottyLeftLevelTwodown: Platform2Down(
            world,
            { 
                x: cx - 85, 
                y: offsetY + 720
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping platform for top right potty
        pottyrightTop: Platform(
            world,
            { 
                x: cx - 100, 
                y: offsetY + 115 
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping for second level down from the right potty
        pottyrightLevelTwodown: Platform2Down(
            world,
            { 
                x: cx - 85, 
                y: offsetY + 115 
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping platform middle of the screen
        middleOfScreen: Platform(
            world,
            { 
                //up and down
                x: cx + 80, 
                // left and right
                y: offsetY + 315
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping platform middle of the screen
        middleOfScreen2: Platform(
            world,
            { 
                //up and down
                x: cx + 50, 
                // left and right
                y: offsetY + 215
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping platform middle of the screen
        middleLeftOfScreen: Platform(
            world,
            { 
                //up and down
                x: cx + 50, 
                // left and right
                y: offsetY + 580
            },
            -1.5708,
            platformWidth * 0.2
        ),

        // Tilemapping platform middle of the screen
        middleLeftOfScreen2: Platform(
            world,
            { 
                //up and down
                x: cx + 80, 
                // left and right
                y: offsetY + 470
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
            height
        ),

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
