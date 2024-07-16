import { ConfigService } from './config/config.service';
import { splitFileAndSortPaths } from './files-functions/split-file/split-file';
import { littleConsoleLogger } from './utils/little-console-logger';
import { toBytes } from './utils/to-bytes';

const config = new ConfigService();

splitFileAndSortPaths({
	filename: config.getOrThrow('filename'),
	stringBufferSize: toBytes(config.getOrThrow('stringBufferSize')),
	workingDir: config.getOrThrow('workingDir'),
	fileEncoding: config.getOrThrow('fileEncoding'),
})
	.catch((err) => {
		littleConsoleLogger.error(err);
	})
	.then(() => {
		littleConsoleLogger.log('file sorting completed successfully');
	});
