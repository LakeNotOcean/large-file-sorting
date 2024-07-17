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
export async function splitFileAndSortPaths(params: splitFileParams) {
	createTmpDir(params.workingDir);
	const lineIterator = initReadlineIterator({
		fileEncoding: params.fileEncoding,
		filePath: join(params.workingDir, params.targetFilename),
	});

	memoryUsageUtil.printMemoryUsage('test');
	const lineBuffer: string[] = [];
	let bufferSize = 0;
	let bufferNumber = 0;
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
		if (bufferSize >= params.stringBufferSize) {
			bufferSize = 0;
			lineBuffer.sort();
			await writeFunc();
			lineBuffer.length = 0;
			bufferNumber += 1;
		}
	}
	if (lineBuffer.length > 0) {
		lineBuffer.sort();
		await writeFunc();
		lineBuffer.length = 0;
	}
}
