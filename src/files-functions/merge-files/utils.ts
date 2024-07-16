import { FileHandle } from 'fs/promises';
import { EncodingEnum } from '../enums/encoding.enum';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { iteratorDataType } from '../types/iterator-data.type';
import { generateFilePath } from '../utils/generate-file-path';
import { initReadlineIterator } from '../utils/init-readline-iterator';
import { writeLineToFileAsync } from '../write-in-file/write-line-to-file-async';
import { mergeTwoFilesParams } from './merge-two-files';

export function initInterator(
	params: mergeTwoFilesParams,
	fileNumber: number,
): AsyncIterableIterator<string> {
	return initReadlineIterator({
		filePath: generateFilePath(
			params.workingDir,
			FilenamePrefixEnum.PREVIOUS,
			fileNumber,
		),
		fileEncoding: params.fileEncoding,
	});
}

export function getWriteLineToFileAsyncFunc(
	fileHadle: FileHandle,
	fileEncoding: EncodingEnum,
): (line: string) => Promise<void> {
	return async (line: string) => {
		await writeLineToFileAsync({
			fileHandle: fileHadle,
			fileEncoding,
			line,
		});
	};
}

export function writeIfFirstIteratorDone() {}

export async function writeAndGetNextIteration(
	writeFunc: (line: string) => Promise<void>,
	iteratorData: iteratorDataType,
) {
	await writeFunc(iteratorData.line);
	return await iteratorData.iterator.next();
}
