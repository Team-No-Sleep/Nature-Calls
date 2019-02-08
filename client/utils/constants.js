import { Constants } from "expo";
module.exports = {
	collisionCategories: {
		mario: 1,
		barrier: 2,
		platform: 4,
	},
	getServerUrl: () => {
		let env = Constants.manifest.releaseChannel;
		if(!env || env === "dev") {
<<<<<<< HEAD
			return "http://10.0.0.74:3001"
=======
			//return "http://192.168.86.106:3001"
>>>>>>> 8cd37fd32379c38b17dac9d885e8b9aab26a5ef8
			// return "http://192.168.0.43:3001"
			return "http://localhost:3001";
			//return "http://192.168.0.43:3001"
		}
		if(env === "default") {
			return Constants.manifest.extra.serverUrl;
		}
	}
}