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
			return "http://10.19.76.26:19000";
		}
		if(env === "default") {
			return Constants.manifest.extra.serverUrl;
		}
	}
}