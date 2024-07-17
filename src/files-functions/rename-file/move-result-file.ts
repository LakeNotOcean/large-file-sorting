import { join } from 'path';
import { GET_SORTED_FILE_NAME } from '../constants/get-sorted-file-name.costant';
import { temporaryDirName } from '../utils/temporary-dir-name';
import { renameFile } from './rename-file';

export async function moveResultFile(
	workingDir: string,
	targetFilename: string,
) {
	const filename = GET_SORTED_FILE_NAME(targetFilename);
	await renameFile(
		join(workingDir, temporaryDirName.get(), filename),
		join(workingDir, filename),
	);
}
