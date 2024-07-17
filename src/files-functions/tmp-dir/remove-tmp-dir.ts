import { rm } from 'fs/promises';
import { join } from 'path';
import { temporaryDirName } from '../utils/temporary-dir-name';

export async function removeTmpDir(workingDir: string) {
	await rm(join(workingDir, temporaryDirName.get()), {
		recursive: true,
		force: true,
	});
}
