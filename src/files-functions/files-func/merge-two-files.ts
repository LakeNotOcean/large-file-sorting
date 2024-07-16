import { FileHandle, open } from 'fs/promises';
import { FilenamePrefixEnum } from 'src/files-functions/enums/filename-prefix.enum';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { generateFilename } from 'src/files-functions/utils/generate-filename';
import { initReadlineIterator } from 'src/files-functions/utils/init-readline-iterator';
import { EncodingEnum } from '../enums/encoding.enum';
import { generatePath } from '../utils/generate-path';
import { writeLineToFileAsync } from '../write-in-file/write-line-to-file-async';

export type mergeTwoFilesParams = {
	firstFileNumber: number;
	secondFileNumber: number;
	newFileNumber: number;
} & workingDirParam &
	encodingParam;

export async function mergeTwoFiles(params: mergeTwoFilesParams) {
	const firstIterator = mergeTwoFilesInitInterator(
		params,
		params.firstFileNumber,
	);
	const secondIterator = mergeTwoFilesInitInterator(
		params,
		params.secondFileNumber,
	);

	let firstIteratorResult = await firstIterator.next();
	let secondIteratorResult = await secondIterator.next();

	const newFilePath = generatePath(
		params.workingDir,
		FilenamePrefixEnum.CURRENT,
		params.newFileNumber,
	);

	const fileHadle = await open(newFilePath, 'w+');
	const writeFunc = getWriteLineToFileAsyncFunc(fileHadle, params.fileEncoding);

	while (!firstIteratorResult.done && !secondIteratorResult.done) {
		let firstSortLine = firstIteratorResult.value;
		let secondSortLine = secondIteratorResult.value;

		if (firstIteratorResult.done) {
			await writeFunc(secondSortLine);
			secondIteratorResult = await secondIterator.next();
			continue;
		} else {
			firstIteratorResult = await firstIterator.next();
		}
		if (secondIteratorResult.done) {
			await writeFunc(firstSortLine);
			firstIteratorResult = await firstIterator.next();
			continue;
		} else {
			secondIteratorResult = await secondIterator.next();
		}
		if (firstSortLine > secondSortLine) {
			const temp = firstSortLine;
			firstSortLine = secondSortLine;
			secondSortLine = temp;
		}
		await writeFunc(firstSortLine);
		await writeFunc(secondSortLine);
	}
	await fileHadle.close();
}

function mergeTwoFilesInitInterator(
	params: mergeTwoFilesParams,
	fileNumber: number,
): AsyncIterableIterator<string> {
	return initReadlineIterator({
		filename: generateFilename(FilenamePrefixEnum.PREVIOUS, fileNumber),
		workingDir: params.workingDir,
		fileEncoding: params.fileEncoding,
	});
}

function getWriteLineToFileAsyncFunc(
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
