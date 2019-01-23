import Matter from "matter-js"
import Tile from "../common/tile";
import ToiletPaper from "./nature_calls_tp.png";

export default (pos) => {
	return {
		size: { width: 24, height: 26 },
		position: pos,
		source: ToiletPaper, 
		renderer: Tile,
        ToiletPaper: true,
        angle: -1.5708
	}
}