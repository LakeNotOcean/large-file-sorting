import { config, DotenvParseOutput } from 'dotenv';
import { join } from 'path';

const CONFIG_FILENAME = 'config.env';

export class ConfigService {
	private configData: DotenvParseOutput;
	readonly origins: Array<string> = [];

	constructor() {
		const configData = config({
			path: join(__dirname, '..', '..', 'env', CONFIG_FILENAME),
		});
		if (!configData.parsed) {
			const error = configData.error ?? new Error('config parse error');
			throw error;
		}
		this.configData = configData.parsed;
	}

	getOrThrow<T = string>(propertyPath: string): T {
		const property = this.configData[propertyPath] as T;
		if (!property) {
			throw new Error(`proterty ${propertyPath} not found`);
		}
		return property;
	}
	get(propertyPath: string) {
		return this.configData[propertyPath];
	}
}
