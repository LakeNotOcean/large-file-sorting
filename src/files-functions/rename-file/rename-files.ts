import { rename } from 'fs/promises';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { fileChangeParams } from '../types/file-change-params.type';
import { generatePath } from '../utils/generate-path';

export async function renameCurrFiles(params: fileChangeParams) {
	const renamePromises = new Array<Promise<void>>();

	for (const fileNumber of params.filesNumbers) {
		const oldPath = generatePath(
			params.workingDir,
			FilenamePrefixEnum.PREVIOUS,
			fileNumber,
		);
		const newPath = generatePath(
			params.workingDir,
			FilenamePrefixEnum.CURRENT,
			fileNumber,
		);
		renamePromises.push(rename(oldPath, newPath));
	}
	const promiseResults = await Promise.allSettled(renamePromises);
	promiseResults.forEach((r) => {
		if (r.status == 'rejected') {
			throw new Error(r.reason);
		}
	});
}
