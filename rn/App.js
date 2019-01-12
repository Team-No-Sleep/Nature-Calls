import React, { Component } from "react";
import DonkeyKong from "react-native-donkey-kong";

export default class App extends Component<{}> {
  render() {
    return (
      <DonkeyKong
        theme={{
          $donkeyKongMenuFont: "ArcadeClassic"
        }}
      />
    );
  }
}
