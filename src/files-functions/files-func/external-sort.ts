import { littleConsoleLogger } from 'src/utils/little-console-logger';
import { memoryUsageUtil } from 'src/utils/memory-usage';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { mergeTwoFiles } from '../merge-files/merge-two-files';
import { moveResultFile } from '../rename-file/move-result-file';
import { renameCurrFiles } from '../rename-file/rename-curr-files';
import { renameLastFile } from '../rename-file/rename-last-file';
import { renameNotPairFile } from '../rename-file/rename-not-pair-file';
import { encodingParam } from '../types/encoding-param.type';
import { workingDirParam } from '../types/working-dir-param.type';
import { findFilesNumbers } from './find-files-numbers';
import { removePrevFiles } from './remove-files';

export type externalSortParams = { targetFilename: string } & workingDirParam &
	encodingParam;

export async function externalSort(params: externalSortParams) {
	let filesNumbers = await findFilesNumbers(
		params.workingDir,
		FilenamePrefixEnum.PREVIOUS,
	);
	while (filesNumbers.length > 1) {
		littleConsoleLogger.log(
			`start the sort iteration, number of files: ${filesNumbers.length}`,
		);
		const newFileNumbers = new Array<number>();

		memoryUsageUtil.printMemoryUsage('before the sort iteration');

		for (let i = 0; i < filesNumbers.length - 1; i += 2) {
			await mergeTwoFiles({
				firstFileNumber: filesNumbers[i],
				secondFileNumber: filesNumbers[i + 1],
				newFileNumber: i / 2,
				workingDir: params.workingDir,
				fileEncoding: params.fileEncoding,
			});
			newFileNumbers.push(i / 2);
		}
		if (filesNumbers.length % 2) {
			await renameNotPairFile(
				params.workingDir,
				filesNumbers.length - 1,
				newFileNumbers.length,
			);
			newFileNumbers.push(newFileNumbers.length);
			filesNumbers.pop();
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

		memoryUsageUtil.printMemoryUsage('after the sort iteration');
		littleConsoleLogger.log(`complition of the sort iteration`);
	}
	if (filesNumbers.length > 0) {
		await renameLastFile(params.workingDir, params.targetFilename);
		await moveResultFile(params.workingDir, params.targetFilename);
	}
}
