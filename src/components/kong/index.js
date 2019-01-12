import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import KongIdling from "./kong-idling.gif";
import KongTantrum from "./kong-tantrum.gif";
import KongTossing from "./kong-tossing.gif";

const actions = {
  idling: KongIdling,
  tantrum: KongTantrum,
  tossing: KongTossing
};

export class Renderer extends Component {
  render() {
    const { width, height } = this.props.size;
    const pos = this.props.body.position;
    const x = pos.x - width / 2;
    const y = pos.y - height / 2;
    const current = this.props.action;

    return (
      <Image
        source={actions[current]}
        style={[
          styles.kong,
          {
            left: x,
            top: y
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  kong: {
    position: "absolute"
  }
});

export default (world, pos) => {
  let width = 85;
  let height = 70;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    friction: 0,
  });
  Matter.World.add(world, [body]);
  return {
    body,
    size: { width, height },
    action: "idling",
    animations: {},
    renderer: <Renderer />
  };
};
