import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { collisionCategories } from "../../utils/constants";
import Matter from "matter-js";

const BarrelOnPlatform = resolveAssetSource(require("./barrel-on-platform.gif"))
const BarrelOnLadder = resolveAssetSource(require("./barrel-on-ladder.gif"))
const BarrelOnPlatformSpecial = resolveAssetSource(require("./barrel-on-platform-special.gif"))
const BarrelOnLadderSpecial = resolveAssetSource(require("./barrel-on-ladder-special.gif"))
const Sparks = resolveAssetSource(require("../props/sparks.gif"))
const Explosion = resolveAssetSource(require("../props/explosion-radial.gif"))

export class Renderer extends Component {
  render() {
    const source = this.props.actions[this.props.action];
    const { width, height } = source;
    const pos = this.props.body.position;
    const x = pos.x - width / 2;
    const y = pos.y - height / 2;
    const vx = this.props.body.velocity.x;
    const actions = this.props.barrel.actions;

    return (
      <Image
        source={source}
        style={[
          styles.barrel,
          {
            left: x,
            top: y,
            width,
            height,
            transform: [{ rotateY: (vx > 0 ? 0 : 180) + "deg" }]
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  barrel: {
    position: "absolute"
  }
});

export const Regular = (world, pos) => {
  let width = 25;
  let height = 25;

  let body = Matter.Bodies.circle(pos.x, pos.y, 12.5, {
    isStatic: false,
    friction: 0.3,
    frictionAir: 0,
    density: 0.9,
    force: { x: 4.5, y: 0 },
    collisionFilter: {
      category: collisionCategories.barrel,
      mask:
        collisionCategories.mario |
        collisionCategories.barrier |
        collisionCategories.platform |
        collisionCategories.barrel
    }
  });

  Matter.World.add(world, [body]);

  return {
    body,
    size: { width, height },
    barrel: true,
    animations: {},
    actions: {
      "on-platform": BarrelOnPlatform,
      "on-ladder": BarrelOnLadder,
      cracked: Explosion
    },
    action: "on-platform",
    renderer: <Renderer />
  };
};

export const Special = (world, pos) => {
  return {
    ...Regular(world, pos),
    barrel: { special: true },
    actions: {
      "on-platform": BarrelOnPlatformSpecial,
      "on-ladder": BarrelOnLadderSpecial,
      cracked: Sparks
    }
  };
};

export default Regular;
