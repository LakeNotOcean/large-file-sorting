import { join } from 'path';
import { FilenamePrefixEnum } from 'src/files-functions/enums/filename-prefix.enum';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { initReadlineIterator } from 'src/files-functions/utils/init-readline-iterator';
import { writeLinesArrayToFile } from 'src/files-functions/write-in-file/write-lines-array-to-file';
import { memoryUsageUtil } from 'src/utils/memory-usage';
import { createTmpDir } from '../tmp-dir/create-tmp-dir';

export type splitFileParams = {
	targetFilename: string;
	stringBufferSize: number;
} & workingDirParam &
	encodingParam;

// Разбиение файла
export async function splitFileAndSortPaths(params: splitFileParams) {
	// Инициализация и создание временной директории
	await createTmpDir(params.workingDir);
	const lineIterator = initReadlineIterator({
		fileEncoding: params.fileEncoding,
		filePath: join(params.workingDir, params.targetFilename),
	});

	const lineBuffer: string[] = [];
	let bufferSize = 0;
	let bufferNumber = 0;
	// Набор логики для записи буфера
	const writeFunc = async () => {
		await writeLinesArrayToFile({
			lines: lineBuffer,
			filenamePrefix: FilenamePrefixEnum.PREVIOUS,
			fileNumber: bufferNumber,
			workingDir: params.workingDir,
			fileEncoding: params.fileEncoding,
		});
	};

	for await (const line of lineIterator) {
		bufferSize += Buffer.byteLength(line, params.fileEncoding);
		lineBuffer.push(line);
		// Записываем буфер в новый файл, если он заполнен
		// После заполнения вызывается сборщик мусора
		if (bufferSize >= params.stringBufferSize) {
			memoryUsageUtil.printMemoryUsage('buffer overflow');
			bufferSize = 0;
			lineBuffer.sort();
			await writeFunc();
			lineBuffer.length = 0;
			if (global.gc) {
				global.gc();
			}
			memoryUsageUtil.printMemoryUsage('after buffer clearing');
			bufferNumber += 1;
		}
	}
	if (lineBuffer.length > 0) {
		lineBuffer.sort();
		await writeFunc();
		lineBuffer.length = 0;
	}
}
