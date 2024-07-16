import { ConfigService } from './config/config.service';
import { EncodingEnum } from './files-functions/enums/encoding.enum';
import { externalSort } from './files-functions/files-func/external-sort';
import { splitFileAndSortPaths } from './files-functions/files-func/split-file';
import { littleConsoleLogger } from './utils/little-console-logger';
import { toBytes } from './utils/to-bytes';

const config = new ConfigService();
const filename = config.getOrThrow('filename');
const workingDir = config.getOrThrow('workingDir');
const fileEncoding = config.getOrThrow<EncodingEnum>('fileEncoding');

littleConsoleLogger.log('start of file splitting...');
splitFileAndSortPaths({
	targetFilename: filename,
	stringBufferSize: toBytes(config.getOrThrow('stringBufferSize')),
	workingDir,
	fileEncoding,
})
	.catch((err) => {
		littleConsoleLogger.error(err);
	})
	.then(() => {
		littleConsoleLogger.log('file splitting completed successfully');
		littleConsoleLogger.log('start of sorting...');
		externalSort({ targetFilename: filename, workingDir, fileEncoding })
			.catch((err) => {
				littleConsoleLogger.error(err);
			})
			.then(() => {
				littleConsoleLogger.log('file sorting completed successfully');
			});
	});
