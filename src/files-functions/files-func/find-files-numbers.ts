import { readdir } from 'fs/promises';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';

export async function findFilesNumbers(
	workingDir: string,
	filePrefix: FilenamePrefixEnum,
): Promise<number[]> {
	const files = await readdir(workingDir, { recursive: false });
	files.filter((f) => f.match(new RegExp(filePrefix)));
	return files.map((f) => {
		const matchResult = f.match(/\d+/)?.[0];
		if (matchResult) {
			return parseInt(matchResult);
		}
		throw new Error('files without numbers');
	});
}
