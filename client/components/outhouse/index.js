import React from "react";
import Matter from "matter-js"
import Tile from "../common/tile";
import Outhouse from "./green/outhouse.gif";

export default (pos) => {
	return {
		size: { width: 90, height: 135 },
		position: pos,
		source: Outhouse, 
		renderer: <Tile />,
        Outhouse: true,
        angle: -1.5708
	}
}



// import React, { Component } from "react";
// import { StyleSheet, Image } from "react-native";
// import Matter from "matter-js"
// import Tile from "../common/tile";
// import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
// import Outhouse from "./red/outhouse.gif";

// export class Renderer extends Component {
//   render() {
// 	let outhouseColor;
// 	if(color === "red"){
// 		outhouseColor = require( "./red/outhouse.gif");
// 	  } else if(color === "green"){
// 		outhouseColor = require( "./green/outhouse.gif");
// 	  }
//     return (
//       <Image
//         source={outhouseColor}
//       />
//     );
//   }
// }
// export default (pos, color) => {

// 	return {
// 		size: { width: 90, height: 135 },
// 		color,
// 		position: pos,
// 		renderer: <Renderer />,
// 		// actions: {
// 		// 	outhouseColor: resolveAssetSource(outhouseColor)
// 		// },
//         angle: -1.5708
// 	}
// }