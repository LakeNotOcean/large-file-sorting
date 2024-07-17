import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { temporaryDirName } from '../utils/temporary-dir-name';
import { removeTmpDir } from './remove-tmp-dir';

export async function createTmpDir(workingDir: string) {
	if (existsSync(workingDir)) {
		await removeTmpDir(workingDir);
	}
	mkdirSync(join(workingDir, temporaryDirName.get()), { recursive: true });
}
