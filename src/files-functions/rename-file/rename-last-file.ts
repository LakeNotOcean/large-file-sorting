import { rename } from 'fs/promises';
import { join } from 'path';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generatePath } from '../utils/generate-path';

export async function renameLastFile(workingDir: string, filename: string) {
	const oldPath = generatePath(workingDir, FilenamePrefixEnum.CURRENT, 0);
	const newPath = join(workingDir, `sorted-${filename}`);
	await rename(oldPath, newPath);
}
