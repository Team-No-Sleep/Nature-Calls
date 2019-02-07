import Input from "./input";
import Controls from "./controls";
import Steering from "./steering";
import Platforms from "./platforms";
import Physics from "./physics";
import Animation from "./animation";
import Camera from "./camera";
import PowerUps from "./power-ups";
import Joust from "./joust";
import gameLogic from "./gameLogic";
import renderOpponent from "./renderOpponent";
import publishPlayer from "./publishPlayer";

export default (playersFromServer, socket, user) => [
	Input,
	Controls,
	Steering,
	Platforms,
	Animation,
	Camera,
	Physics,
	PowerUps(playersFromServer, socket),
	Joust(socket),
	gameLogic(socket),
	renderOpponent(playersFromServer),
	publishPlayer(socket, user)
];
