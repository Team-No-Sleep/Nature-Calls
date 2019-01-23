import React from "react";
import Matter from "matter-js"
import Tile from "../common/tile";
import ToiletPaper from "./nature_calls_tp.gif";

export default (pos) => {
	return {
		size: { width: 50, height: 50 },
		position: pos,
		source: ToiletPaper, 
		renderer: <Tile />,
        ToiletPaper: true,
        angle: -1.5708
	}
}