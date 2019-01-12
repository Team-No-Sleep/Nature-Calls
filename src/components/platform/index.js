import React, { PureComponent } from "react";
import Matter from "matter-js";
import Platform from "./platform.png";
import Tile from "../common/tile";
import { collisionCategories } from "../../utils/constants";

export class Renderer extends PureComponent {
  render() {
    return (
      <Tile
        source={Platform}
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

  return {
    platform: { vertices},
    body,
    size: { width, height },
    renderer: <Renderer />
  };
};
