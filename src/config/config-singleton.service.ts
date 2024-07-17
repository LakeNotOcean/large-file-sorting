import { ConfigService } from './config.service';

export const configServiceSingleton = (function () {
	let configService: ConfigService;
	return {
		getInstance: function () {
			if (!configService) {
				configService = new ConfigService();
			}
			return configService;
		},
	};
})();
