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
			return "http://localhost:3001";
		}
		if(env === "default") {
			return Constants.manifest.extra.serverUrl;
		}
	}
}