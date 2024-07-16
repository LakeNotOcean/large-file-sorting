import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { TEMPORARY_DIR_NAME } from '../constants/temporary-dir.constant';
import { removeTmpDir } from './remove-tmp-dir';

export function createTmpDir(workingDir: string) {
	if (existsSync(workingDir)) {
		removeTmpDir(workingDir);
	}
	mkdirSync(join(workingDir, TEMPORARY_DIR_NAME), { recursive: true });
}
