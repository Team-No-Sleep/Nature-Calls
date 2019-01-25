import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "../components/platform";
import Platform2Down from "../components/platform2Down";
import PlatGrass from "../components/platformGrass";
import Barrier from "../components/barrier";
import Mario from "../components/mario";
import ToiletPaper from "../components/toiletPaper";
import Outhouse from "../components/outhouse";



const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;
const offsetY = (width - 465) / 2 -180;
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

        // Tilemapping platform for top left potty / LEFT POTTY PLATFORM
        pottyLeftTop: PlatGrass(
            world,
            { 
                x: cy - 100, 
                y: offsetY + 690
            },
            -1.5708,
            platformWidth * 0.2
        ),



        // Tilemapping platform for top right potty / RIGHT POTTY PLATFORM
        pottyrightTop: PlatGrass(
            world,
            { 
                x: cy - 100, 
                y: offsetY + 115 
            },
            -1.5708,
            platformWidth * 0.2
        ),


        // Tilemapping platform middle of the screen / BOTTOM RIGHT PLATFORM
        middleOfScreen: PlatGrass(
            world,
            { 
                //up and down
                x: cy + 111, 
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
                x: cy + 80, 
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
                x: cy + 50, 
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
                x: cy + 111, 
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
                x: cy + 80, 
                // left and right
                y: offsetY + 620
            },
            -1.5708,
            platformWidth * 0.1
        ),


        // Left barrier of landscap map
        leftBarrier: Barrier(
            world,
            {  
                x: cy - platformWidth / 2 + 10,
                y: cy 
            }, 
            height
        ),
        // RIght barrier of landscap map
        rightBarrier: Barrier(
            world,
            {
                x: cy + platformWidth / 2 - 10,
                y: cy
            },
            height
        ),

        // Tilemapping platform middle of the screen / UPPER LEFT MIDDLE PLATFORM
        upperMiddlePlatLeft: PlatGrass(
            world,
            { 
                //up and down
                x: cy + 0, 
                // left and right
                y: offsetY + 500
            },
            -1.5708,
            platformWidth * 0.14
        ),

         // Tilemapping platform middle of the screen / BETWEEN MIDDLE PLATFORMS
         betweenMiddlePlatforms: PlatGrass(
            world,
            { 
                //up and down
                x: cy + 0, 
                // left and right
                y: offsetY + 410
            },
            -1.5708,
            platformWidth * 0.05
        ),

        // Tilemapping platform middle of the screen / UPPER RIGHT MIDDLE PLATFORM
        upperMiddlePlatRight: PlatGrass(
            world,
            { 
                //up and down
                x: cy + 0, 
                // left and right
                y: offsetY + 320
            },
            -1.5708,
            platformWidth * 0.14
        ),

        // Tilemapping platform top right / LOWER RIGHT POTTY PLATFORM
        lowerPottyRight: PlatGrass(
            world,
            { 
                //up and down
                x: cy - 55, 
                // left and right
                y: offsetY + 230
            },
            -1.5708,
            platformWidth * 0.15
        ),

        // Tilemapping platform top right / LOWER RIGHT POTTY PLATFORM
        lowerPottyLeft: PlatGrass(
            world,
            { 
                //up and down
                x: cy - 55, 
                // left and right
                y: offsetY + 580
            },
            -1.5708,
            platformWidth * 0.15
        ),
        
        outhouse: Outhouse(
            {
                x: cy - 145, 
                y: offsetY + 115
            },
        ),
        outhouse2: Outhouse( 
            {
                x: cy - 145, 
                y: offsetY + 710,
            },
        ),
        
        //Spawns at the bottom
        mario: Mario(world, { x: cy +20, y: 600 }),
        dino2: Mario(world, { x: cy + 20, y: 70 }),

        //Spawns on top of outhouse
        // mario: Mario(world, { x: cy - 210, y: 620 }), 
        // dino2: Mario(world, { x: cy - 210, y: 100 }),

        toiletPaper: ToiletPaper( {x: cy + 125, y: cy} )
        

        
    };
};
