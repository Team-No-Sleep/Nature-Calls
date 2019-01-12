import React, { PureComponent } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Title from "./title";
import Heading from "./heading";
import Button from "./button";
import Item from "./item";

export default class MainMenu extends PureComponent {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Title />
        <Button onPress={this.props.onPlayGame}>Play Game</Button>
        <Heading>{`Made With ${Platform.OS == "ios" ? "🍌🍌🍌" : ".."}`}</Heading>
        <Item
          onPress={_ =>
            Linking.openURL(
              "https://github.com/bberak/react-native-game-engine"
            )}
        >
          React Native Game Engine
        </Item>
        <Item onPress={_ => Linking.openURL("http://brm.io/matter-js")}>
          Matter Js
        </Item>
        <Item onPress={_ => Linking.openURL("https://www.aseprite.org")}>
          Aseprite
        </Item>
        <Item
          onPress={_ => Linking.openURL("https://www.spriters-resource.com")}
        >
          Spriters Resource
        </Item>
        <Heading>Copyright Notice</Heading>
        <Item>
          All content, artwork, sounds, characters and graphics are the property
          of Nintendo of America Inc, its affiliates and/or subsidiaries.
        </Item>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$donkeyKongMenuBackgroundColor"
  },
  contentContainer: {
    maxWidth: "$donkeyKongMenuMaxWidth",
    alignSelf: "center",
    alignItems: "center"
  }
});
