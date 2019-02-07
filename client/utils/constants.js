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
			//return "http://192.168.86.106:3001"
			// return "http://192.168.0.43:3001"
			//return "http://localhost:3001";
			// return "http://192.168.0.43:3001"
			return "http://192.168.1.232:3001"
		}
		if(env === "default") {
			return Constants.manifest.extra.serverUrl;
		}
	}
}