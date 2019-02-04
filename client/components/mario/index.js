import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { collisionCategories } from "../../utils/constants";
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Matter from "matter-js";

export class Renderer extends Component {
  render() {
    const source = this.props.actions[this.props.action];
    if(!source){
      console.log(this.props);
    }
    const { width, height } = source;
    const body = this.props.body;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;
    const angle = body.angle;
    const direction = this.props.direction.horizontal;

    return (
      <Image
        source={source}
        style={[
          styles.mario,
          {
            left: x,
            top: y,
            transform: [
              { rotateZ: -90 + "deg" },
              { rotateY: (direction === "right" ? 0 : 180) + "deg" }
            ]
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  mario: {
    position: "absolute"
  }
});

export default (world, pos, color, isPlayerCharacter, characterId) => {
  let width = 30;
  let height = 40;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 0.8,
    frictionAir: 0.2,
    angle: 0,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.mario,
      mask:
        collisionCategories.barrier |
        collisionCategories.platform |
        collisionCategories.barrel
    }
  });
  Matter.World.add(world, [body]);

  
  //load gifs based on dino color
  let MarioIdling, MarioWalking, MarioJumping, MarioHolding, MarioClimbing, MarioRising, MarioDead, MarioIdlingHammering, MarioWalkingHammering, MarioJumpingHammering;
  
  if(color === "red"){
    MarioIdling = require( "./red/mario-idling.gif");
    MarioWalking = require("./red/mario-walking.gif");
    MarioJumping = require("./red/mario-jumping.gif");
    MarioHolding = require("./red/mario-holding.gif");
    MarioClimbing = require("./red/mario-climbing.gif");
    MarioRising = require("./red/mario-rising.gif");
    MarioDead = require("./red/mario-dead.gif");
    MarioIdlingHammering = require("./red/mario-idling-hammering.gif");
    MarioWalkingHammering = require("./red/mario-walking-hammering.gif");
    MarioJumpingHammering = require("./red/mario-walking-hammering.gif");
  } else if(color === "green"){
    MarioIdling = require( "./green/mario-idling.gif");
    MarioWalking = require("./green/mario-walking.gif");
    MarioJumping = require("./green/mario-jumping.gif");
    MarioHolding = require("./green/mario-holding.gif");
    MarioClimbing = require("./green/mario-climbing.gif");
    MarioRising = require("./green/mario-rising.gif");
    MarioDead = require("./green/mario-dead.gif");
    MarioIdlingHammering = require("./green/mario-idling-hammering.gif");
    MarioWalkingHammering = require("./green/mario-walking-hammering.gif");
    MarioJumpingHammering = require("./green/mario-walking-hammering.gif");
  }

  return {
    body,
    size: { width, height },
    color,
    isPlayerCharacter: isPlayerCharacter,
    characterId: characterId,
    controls: {
      gestures: {},
      mode: "platform"
    },
    direction: {
      horizontal: "right",
      vertical: "up"
    },
    action: "idling",
    actions: {
      idling: resolveAssetSource(MarioIdling),
      walking: resolveAssetSource(MarioWalking),
      jumping: resolveAssetSource(MarioJumping),
      holding: resolveAssetSource(MarioHolding),
      climbing: resolveAssetSource(MarioClimbing),
      rising: resolveAssetSource(MarioRising),
      dead: resolveAssetSource(MarioDead),
      idlingHammering: resolveAssetSource(MarioIdlingHammering),
      walkingHammering: resolveAssetSource(MarioWalkingHammering),
      JumpingHammering: resolveAssetSource(MarioJumpingHammering)
    },
    "power-ups": {},
    animations: {},
    score: 0,
    renderer: <Renderer />
  };
};
