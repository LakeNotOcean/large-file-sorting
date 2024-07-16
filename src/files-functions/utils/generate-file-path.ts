import { join } from 'path';
import { TEMPORARY_PREFIX } from '../constants/temporary-dir.constant';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateDirPath } from './generate-dir-path';

export function generateFilePath(
	workingDir: string,
	filenamePrefix: FilenamePrefixEnum,
	fileNumber: number,
): string {
	return join(
		generateDirPath(workingDir),
		`${TEMPORARY_PREFIX}_${filenamePrefix}_${fileNumber}`,
	);
}
