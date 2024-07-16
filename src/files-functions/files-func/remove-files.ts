import { unlink } from 'fs/promises';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { fileChangeParams } from '../types/file-change-params.type';
import { generateFilePath } from '../utils/generate-file-path';

export async function removePrevFiles(params: fileChangeParams) {
	const removePromises = new Array<Promise<void>>();

	for (const fileNumber of params.filesNumbers) {
		const path = generateFilePath(
			params.workingDir,
			FilenamePrefixEnum.PREVIOUS,
			fileNumber,
		);
		removePromises.push(unlink(path));
	}
	const promiseResults = await Promise.allSettled(removePromises);
	promiseResults.forEach((r) => {
		if (r.status == 'rejected') {
			throw new Error(r.reason);
		}
	});
}
