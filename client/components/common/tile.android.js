import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import _ from "lodash";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export default class Tile extends PureComponent {
  render() {
    const {
      source,
      size,
      position,
      angle = 0,
    } = this.props;
    const { width, height } = size;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    const { width: imageWidth, height: imageHeight } = resolveAssetSource(
      source
    );
    const direction = width > height ? "row" : "column";
    const stop = direction === "row" ? width : height;
    const increment = direction === "row" ? imageWidth : imageHeight;
    const images = _.range(0, stop, increment).map((x, i) => (
      <Image key={i} source={source} />
    ));

    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: direction,
            left: x,
            top: y,
            transform: [{ rotateZ: angle + "rad" }],
            width,
            height
          }
        ]}
      >
        {images}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute"
  }
});
