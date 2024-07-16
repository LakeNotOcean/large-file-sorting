import { join } from 'path';
import { TEMPORARY_DIR_NAME } from '../constants/temporary-dir.constant';

export function generateDirPath(workingDir: string): string {
	return join(workingDir, TEMPORARY_DIR_NAME);
}
