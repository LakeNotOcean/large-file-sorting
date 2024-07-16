import { join } from 'path';
import { GET_SORTED_FILE_NAME } from '../constants/get-sorted-file-name.costant';
import { TEMPORARY_DIR_NAME } from '../constants/temporary-dir.constant';
import { renameFile } from './rename-file';

export async function moveResultFile(
	workingDir: string,
	targetFilename: string,
) {
	const filename = GET_SORTED_FILE_NAME(targetFilename);
	await renameFile(
		join(workingDir, TEMPORARY_DIR_NAME, filename),
		join(workingDir, filename),
	);
}
