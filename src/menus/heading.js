import React, { PureComponent } from "react";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const colorize = () => {
  let index = -1;
  let offset = 0;
  let colors = [
    "#ff4136",
    "#ff851b",
    "#ffdc00",
    "#2ecc40",
    "#0074d9",
    "#b10dc9"
  ];

  return {
    shift() {
      index = 0;
      offset++;
    },
    next(char) {
      if (char && char.trim() && char.charCodeAt(0) <= 255) {
        index++;
      }
      return colors[
        (colors.length - offset % colors.length + index) % colors.length
      ];
    }
  };
};

export default class Heading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.colorize = colorize();
    if (this.props.groovy) {
      this.timerId = setInterval(_ => {
        this.colorize.shift();
        this.forceUpdate();
      }, 100);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <Text style={styles.heading}>
        {[...(this.props.children || "")].map((c, i) => (
          <Text
            key={i}
            textBreakStrategy={"simple"}
            style={{ color: this.colorize.next(c) }}
          >
            {c}
          </Text>
        ))}
      </Text>
    );
  }
}

const styles = EStyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    color: "#FFF",
    fontFamily: "$donkeyKongMenuFont"
  }
});
