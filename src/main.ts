import { configServiceSingleton } from './config/config-singleton.service';
import { EncodingEnum } from './files-functions/enums/encoding.enum';
import { externalSort } from './files-functions/files-func/external-sort';
import { splitFileAndSortPaths } from './files-functions/files-func/split-file';
import { littleConsoleLogger } from './utils/little-console-logger';
import { toBytes } from './utils/to-bytes';

try {
	// предварительно собираем параметры
	const config = configServiceSingleton.getInstance();
	const filename = config.getOrThrow('filename');
	const workingDir = config.getOrThrow('workingDir');
	const fileEncoding = config.getOrThrow<EncodingEnum>('fileEncoding');

	littleConsoleLogger.log('start of file splitting...');
	// Разбиение исходного файла и сортировка полученных чанков
	await splitFileAndSortPaths({
		targetFilename: filename,
		stringBufferSize: toBytes(config.getOrThrow('stringBufferSize')),
		workingDir,
		fileEncoding,
	});
	littleConsoleLogger.log('file splitting completed successfully');
	littleConsoleLogger.log('start of sorting...');
	// Внещняя сортировка полученных ранее файлов
	await externalSort({ targetFilename: filename, workingDir, fileEncoding });
	littleConsoleLogger.log('file sorting completed successfully');
} catch (err) {
	littleConsoleLogger.error(err);
}
