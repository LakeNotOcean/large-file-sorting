import { littleConsoleLogger } from 'src/utils/little-console-logger';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { renameCurrFiles } from '../rename-file/rename-files';
import { renameLastFile } from '../rename-file/rename-last-file';
import { encodingParam } from '../types/encoding-param.type';
import { workingDirParam } from '../types/working-dir-param.type';
import { findFilesNumbers } from './find-files-numbers';
import { mergeTwoFiles } from './merge-two-files';
import { removePrevFiles } from './remove-files';

export type externalSortParams = { filename: string } & workingDirParam &
	encodingParam;

export async function externalSort(params: externalSortParams) {
	let filesNumbers = await findFilesNumbers(
		params.workingDir,
		FilenamePrefixEnum.CURRENT,
	);
	while (filesNumbers.length > 1) {
		littleConsoleLogger.log(
			`start of sort the iteration, number of files: ${filesNumbers.length}`,
		);
		const newFileNumbers = new Array<number>();
		for (let i = 0; i < filesNumbers.length; i += 2) {
			await mergeTwoFiles({
				firstFileNumber: filesNumbers[i],
				secondFileNumber: filesNumbers[i + 1],
				newFileNumber: i / 2,
				workingDir: params.workingDir,
				fileEncoding: params.fileEncoding,
			});
			newFileNumbers.push(i / 2);
		}
		await removePrevFiles({
			workingDir: params.workingDir,
			filesNumbers,
		});
		await renameCurrFiles({
			workingDir: params.workingDir,
			filesNumbers: newFileNumbers,
		});
		filesNumbers.length = 0;
		filesNumbers = newFileNumbers;

		littleConsoleLogger.log(`complition of the sort iteration`);
	}
	if (filesNumbers.length > 0) {
		await renameLastFile(params.workingDir, params.filename);
	}
}
