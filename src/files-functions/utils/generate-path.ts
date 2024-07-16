import { join } from 'path';
import { FilenamePrefixEnum } from '../enums/filename-prefix.enum';
import { generateFilename } from './generate-filename';

export function generatePath(
	workingDir: string,
	filenamePrefix: FilenamePrefixEnum,
	fileNumber: number,
): string {
	return join(workingDir, generateFilename(filenamePrefix, fileNumber));
}
