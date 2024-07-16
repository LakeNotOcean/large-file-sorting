import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { fileChangeParams } from '../types/file-change-params.type';
import { generateFilePath } from '../utils/generate-file-path';
import { renameFile } from './rename-file';

export async function renameCurrFiles(params: fileChangeParams) {
	const renamePromises = new Array<Promise<void>>();

	for (const fileNumber of params.filesNumbers) {
		const oldFilePath = generateFilePath(
			params.workingDir,
			FilenamePrefixEnum.CURRENT,
			fileNumber,
		);
		const newFilePath = generateFilePath(
			params.workingDir,
			FilenamePrefixEnum.PREVIOUS,
			fileNumber,
		);
		renamePromises.push(renameFile(oldFilePath, newFilePath));
	}
	const promiseResults = await Promise.allSettled(renamePromises);
	promiseResults.forEach((r) => {
		if (r.status == 'rejected') {
			throw new Error(r.reason);
		}
	});
}
