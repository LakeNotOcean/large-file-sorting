import { readdir } from 'fs/promises';
import { TEMPORARY_PREFIX } from '../constants/temporary-dir.constant';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateDirPath } from '../utils/generate-dir-path';

export async function findFilesNumbers(
	workingDir: string,
	filePrefix: FilenamePrefixEnum,
): Promise<number[]> {
	const files = await readdir(generateDirPath(workingDir), {
		recursive: false,
	});
	const tempFiles = files.filter((f) =>
		f.match(new RegExp(`${TEMPORARY_PREFIX}_${filePrefix}`, 'gmi')),
	);
	return tempFiles.map((f) => {
		const matchResult = f.match(/\d+/)?.[0];
		if (matchResult) {
			return parseInt(matchResult);
		}
		throw new Error('files without numbers');
	});
}
