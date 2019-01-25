import React from "react";
import Matter from "matter-js"
import Tile from "../common/tile";
import Outhouse from "./outhouse.gif";

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