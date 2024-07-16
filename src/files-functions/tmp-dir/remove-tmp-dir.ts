import { rmSync } from 'fs';
import { join } from 'path';
import { TEMPORARY_DIR_NAME } from '../constants/temporary-dir.constant';

export function removeTmpDir(workingDir: string) {
	rmSync(join(workingDir, TEMPORARY_DIR_NAME), {
		recursive: true,
		force: true,
	});
}
