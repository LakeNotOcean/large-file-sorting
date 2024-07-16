import { closeSync, openSync } from 'fs';
import { join } from 'path';
import { FilenamePrefixEnum } from 'src/files-functions/enums/filename-prefix.enum';
import { encodingParam } from 'src/files-functions/types/encoding-params.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { generateFilename } from 'src/files-functions/utils/generate-filename';
import { initReadlineIterator } from 'src/files-functions/utils/init-readline-iterator';

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

	let firstLine = await firstIterator.next();
	let secondLine = await secondIterator.next();

	const newFilePath = join(
		params.workingDir,
		generateFilename(FilenamePrefixEnum.CURRENT, params.newFileNumber),
	);

	const fd = openSync(newFilePath, 'w+');

	while (!firstLine.done && !secondLine.done) {
		let firstSortLine = firstLine.value;
		let secondSortLine = secondLine.value;

		if (firstLine.done) {
		} else {
			firstLine = await firstIterator.next();
		}
		if (secondLine.done) {
		} else {
			secondLine = await secondIterator.next();
		}
		if (firstSortLine > secondSortLine) {
			const temp = firstSortLine;
			firstSortLine = secondSortLine;
			secondSortLine = temp;
		}
	}
	closeSync(fd);
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
