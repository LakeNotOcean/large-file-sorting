import { open } from 'fs/promises';
import { FilenamePrefixEnum } from 'src/files-functions/enums/filename-prefix.enum';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { iteratorDataType } from '../types/iterator-data.type';
import { generateFilePath } from '../utils/generate-file-path';
import {
	getWriteLineToFileAsyncFunc,
	initInterator,
	writeAndGetNextIteration,
} from './utils';

export type mergeTwoFilesParams = {
	firstFileNumber: number;
	secondFileNumber: number;
	newFileNumber: number;
} & workingDirParam &
	encodingParam;

export async function mergeTwoFiles(params: mergeTwoFilesParams) {
	const firstIterator = initInterator(params, params.firstFileNumber);
	const secondIterator = initInterator(params, params.secondFileNumber);

	let firstIteratorResult = await firstIterator.next();
	let secondIteratorResult = await secondIterator.next();

	const newFilePath = generateFilePath(
		params.workingDir,
		FilenamePrefixEnum.CURRENT,
		params.newFileNumber,
	);

	const fileHadle = await open(newFilePath, 'w+');
	const writeFunc = getWriteLineToFileAsyncFunc(fileHadle, params.fileEncoding);

	while (!firstIteratorResult.done || !secondIteratorResult.done) {
		let firstFileData: iteratorDataType = {
			iterator: firstIterator,
			line: firstIteratorResult.value,
		};
		let secondFileData: iteratorDataType = {
			iterator: secondIterator,
			line: secondIteratorResult.value,
		};

		if (firstIteratorResult.done) {
			secondIteratorResult = await writeAndGetNextIteration(
				writeFunc,
				secondFileData,
			);
			continue;
		}
		if (secondIteratorResult.done) {
			firstIteratorResult = await writeAndGetNextIteration(
				writeFunc,
				firstFileData,
			);
			continue;
		}
		if (firstFileData.line > secondFileData.line) {
			secondIteratorResult = await writeAndGetNextIteration(
				writeFunc,
				secondFileData,
			);
		} else {
			firstIteratorResult = await writeAndGetNextIteration(
				writeFunc,
				firstFileData,
			);
		}
	}
	await fileHadle.close();
}
