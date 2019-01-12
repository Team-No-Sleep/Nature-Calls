import Matter from "matter-js"
import Tile from "../common/tile";
import Hammer from "./hammer.gif";

export default (pos) => {
	return {
		size: { width: 24, height: 26 },
		position: pos,
		source: Hammer, 
		renderer: Tile,
		hammer: true
	}
}