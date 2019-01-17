import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";

export default class Tile extends PureComponent {
  render() {
    const { size, position, angle, source } = this.props;
    const { width, height } = size;
    const x = position.x - width / 2;
    const y = position.y - height / 2;

    return (
      <Image
        source={source}
        resizeMode={"repeat"}
        style={[
          styles.container,
          {
            left: x,
            top: y,
            transform: [{ rotateZ: angle + "rad" }],
            width,
            height
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute"
  }
});
