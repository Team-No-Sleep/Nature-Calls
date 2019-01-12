# Making a Game with React Native

In this series of posts we'll be developing a remake of the classic Donkey Kong arcade game using React Native and [React Native Game Engine](https://github.com/bberak/react-native-game-engine). Since this will be a mobile-only game, we're going to simplify the controls greatly from the original - our game should be playable with one finger only.

Here's a preview of what we're trying to achieve:

<p align="center">
	<img src="https://raw.githubusercontent.com/bberak/react-native-donkey-kong/master/assets/gifs/1.gif" height="450" />
	<img src="https://raw.githubusercontent.com/bberak/react-native-donkey-kong/master/assets/gifs/2.gif" height="450" />
	<img src="https://raw.githubusercontent.com/bberak/react-native-donkey-kong/master/assets/gifs/3.gif" height="450" />
</p>

If you're not familiar with the original game, our character Mario (originally known as Jump Man) is trying to rescue the Princess (orinally known as Pauline) whilst dodging barrels that are being hurtled down a series of ramps by the main antagonist - Kong.

To keep this moving along at a good pace, this won't be a line-by-line tutorial - we'll just cover some important and post-worthy topics. See [React Native Donkey Kong](https://github.com/bberak/react-native-donkey-kong) for the full source code.

## Project Setup

After you have initialized a vanilla React Native or Expo project, install the following prerequisites.

### React Native Game Engine

This library will help us run our game in a loop and manage/manipulate our game entities (players; projectiles; enemies; ladders; platforms etc). In particular we'll be using the GameEngine component which is a loose implmenntation of the [Component-Entity-Systems pattern](https://github.com/bberak/react-native-game-engine#managing-complexity-with-component-entity-systems).

```npm install --save react-native-game-engine```

### Matter JS

This is 2D physics library and will help us simulate the throwing of projectiles down a series of sloped ramps (see preview above). It will also help us move our character Mario up the ramps towards the Princess.

```npm install --save matter-js```

### Other NPM Pacakges

```
npm install --save lodash # Always good to have
npm install  --save d3-interpolate # Will help us create a nice jump curve
```

### Spriters Resource

I found some great art and assets from the website [Spriters Resource](https://www.spriters-resource.com). This where I found the original spritesheets for Donkey Kong. They have assets for a tonne of other games.

### Aseprite

In order to edit, slice and scale the sprites for our game I used a great pixel-art tool called [Aseprite](https://www.aseprite.org).

We won't need to edit any artwork in this tutorial - we'll simply use the images sprites from from the [React Native Donkey Kong](https://github.com/bberak/react-native-donkey-kong) repo.


## Initiating the Game Entities

Game entities are essentially all the game objects in our game world (they don't necessarily have to be visible either) and we can add and remove them as we please. In our game, this will include Mario; the platforms; the barrels; Princess; Kong; ladders etc.

First, let's code the components for our platform entties. Create the following file ```platform.js```:

```javascript
import React, { PureComponent } from "react";
import Matter from "matter-js";
import PlatformImage from "./platform.png"; //-- You can get the images from our repo.
import Tile from "./tile"; //-- This is just a helper component
import { collisionCategories } from "./constants";

export class Renderer extends PureComponent {
  render() {
    return (
      <Tile
        source={PlatformImage}
        size={this.props.size}
        position={this.props.body.position}
        angle={this.props.body.angle}
      />
    );
  }
}

export default (world, pos, angle, width, category = 0x0002) => {
  let height = 20;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    angle: angle,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.platform,
      mask: collisionCategories.barrel
    }
  });

  let vertices = [
    { x: pos.x - width / 2, y: pos.y - height / 2 },
    { x: pos.x + width / 2, y: pos.y - height / 2 },
    { x: pos.x - width / 2, y: pos.y + height / 2 },
    { x: pos.x + width / 2, y: pos.y + height / 2 }
  ];

  Matter.Vertices.rotate(vertices, body.angle, body.position);

  Matter.World.add(world, [body]);

  //-- These are all the components our platform entities will need.
  //-- Notice the renderer component? Our GameEngine will only draw entities that contain
  //-- a renderer component - the rest will not get displayed.
  return {
    platform: { vertices},
    body,
    size: { width, height },
    renderer: <Renderer />
  };
};
```

Let's create our first (and only) level, create a file called ```entities.js```:

```javascript
import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Platform from "./platform";
import Mario from "./mario";

//-- Overriding this function because the original references HTMLElement
//-- which will throw an error when running in a React Native context
Matter.Common.isElement = () => false; 

//-- These variable will help us position our entities on the device's screen
const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;
const offsetY = (height - 465) / 2 - 35;
const platformWidth = Math.min(width, 430);

export const LevelOne = () => {
    
    //-- We intiate our physics engine and world
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    // The origin of our world is in the top-left corner. Hence, the y-axis increases down the screen!
    world.gravity = { x: 0, y: 2 }; 

    //-- Our game entities for level one are below. Notice they all have unique ids (platform1, platform2 etc) and
    //-- we instantiate there components using dedicated function calls (the components can be verbose - 
    //-- so I'm hiding the details here)
    return {
        physics: { engine: engine, world: world },

        platform1: Platform(world, { x: cx, y: offsetY + 35 }, 0, platformWidth * 0.25),
        platform2: Platform(world, { x: cx - 15, y: offsetY + 100 }, 0, platformWidth * 0.8),
        platform3: Platform(world, { x: cx + 15, y: offsetY + 165 }, -0.07, platformWidth * 0.8),
        platform4: Platform(world, { x: cx - 15, y: offsetY + 240 }, 0.07, platformWidth * 0.8),
        platform5: Platform(world, { x: cx + 15, y: offsetY + 315 }, -0.07, platformWidth * 0.8),
        platform6: Platform(world, { x: cx - 15, y: offsetY + 390 }, 0.07, platformWidth * 0.8),
        platform7: Platform(world, { x: cx, y: offsetY + 465 }, 0, platformWidth * 0.9),

        mario: Mario(world, { x: cx, y: offsetY + 465 - 20 / 2 - 20 }),
    };
};
```

Next let's update our ```App.js``` file:

```javascript
import React, { PureComponent } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { LevelOne } from "./entities";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GameEngine
        ref={"engine"}
        style={styles.game}
        systems={[]}
        entities={LevelOne()}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  }
});
```

> Notice that we can pass children into our GameEngine component and they will get rendered after our entities.

Now we can fire up our app ```react-native run-ios``` and hopefully we should be able to see our seven platforms and Mario being rendered by our GameEngine component.

## Coming Up

In the next post we'll start wiring up our systems and moving our character with some simple gestures.