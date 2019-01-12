import React, { PureComponent } from "react";
import Matter from "matter-js";
import Ladder from "./ladder.png";
import Tile from "../common/tile";
import { point, basePoint, containsPoint } from "../../utils";
import { collisionCategories } from "../../utils/constants";

export class Renderer extends PureComponent {
  render() {
    return (
      <Tile
        source={Ladder}
        size={this.props.size}
        position={this.props.body.position}
      />
    );
  }
}

export default (
  world,
  pos,
  height,
  climbable = false,
  acceptBarrels = false,
  exitDirection = "left"
) => {
  let width = 24;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.ladder,
      mask: collisionCategories.ladder
    }
  });

  Matter.World.add(world, [body]);

  return {
    body,
    ladder: {
      climbable,
      acceptBarrels,
      exitDirection
    },
    size: { width, height },
    renderer: <Renderer />
  };
};
