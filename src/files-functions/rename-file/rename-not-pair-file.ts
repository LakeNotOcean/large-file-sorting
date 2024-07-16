import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateFilePath } from '../utils/generate-file-path';
import { renameFile } from './rename-file';

export async function renameNotPairFile(
	workingDir: string,
	oldFileNumber: number,
	newFileNumber: number,
) {
	await renameFile(
		generateFilePath(workingDir, FilenamePrefixEnum.PREVIOUS, oldFileNumber),
		generateFilePath(workingDir, FilenamePrefixEnum.CURRENT, newFileNumber),
	);
}
