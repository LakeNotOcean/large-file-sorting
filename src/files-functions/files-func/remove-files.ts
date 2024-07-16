import { mkdir } from 'fs/promises';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { fileChangeParams } from '../types/file-change-params.type';
import { generatePath } from '../utils/generate-path';

export async function removePrevFiles(params: fileChangeParams) {
	const removePromises = new Array<Promise<void>>();

	for (const fileNumber of params.filesNumbers) {
		const path = generatePath(
			params.workingDir,
			FilenamePrefixEnum.PREVIOUS,
			fileNumber,
		);
		removePromises.push(mkdir(path));
	}
	const promiseResults = await Promise.allSettled(removePromises);
	promiseResults.forEach((r) => {
		if (r.status == 'rejected') {
			throw new Error(r.reason);
		}
	});
}
