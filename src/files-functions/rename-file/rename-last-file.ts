import { join } from 'path';
import { GET_SORTED_FILE_NAME } from '../constants/get-sorted-file-name.costant';
import { TEMPORARY_DIR_NAME } from '../constants/temporary-dir.constant';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateFilePath } from '../utils/generate-file-path';
import { renameFile } from './rename-file';

export async function renameLastFile(
	workingDir: string,
	targetFilename: string,
) {
	await renameFile(
		generateFilePath(workingDir, FilenamePrefixEnum.PREVIOUS, 0),
		join(workingDir, TEMPORARY_DIR_NAME, GET_SORTED_FILE_NAME(targetFilename)),
	);
}
