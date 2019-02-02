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
			return "http://localhost:3001";
=======
			return "http://10.18.239.86:19002";
>>>>>>> c3efe55b8c1ca510ac0e530b535b584bc5ea80da
		}
		if(env === "default") {
			return Constants.manifest.extra.serverUrl;
		}
	}
}