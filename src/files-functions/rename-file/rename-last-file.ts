import { join } from 'path';
import { GET_SORTED_FILE_NAME } from '../constants/get-sorted-file-name.costant';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateFilePath } from '../utils/generate-file-path';
import { temporaryDirName } from '../utils/temporary-dir-name';
import { renameFile } from './rename-file';

export async function renameLastFile(
	workingDir: string,
	targetFilename: string,
) {
	await renameFile(
		generateFilePath(workingDir, FilenamePrefixEnum.PREVIOUS, 0),
		join(
			workingDir,
			temporaryDirName.get(),
			GET_SORTED_FILE_NAME(targetFilename),
		),
	);
}
