import { join } from 'path';
import { temporaryDirName } from './temporary-dir-name';
export function generateDirPath(workingDir: string): string {
	return join(workingDir, temporaryDirName.get());
}
