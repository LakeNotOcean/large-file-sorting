import { open } from 'fs/promises';
import { FilenamePrefixEnum } from 'src/files-functions/enums/filename-prefix.enum';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { generateFilePath } from 'src/files-functions/utils/generate-file-path';
import { writeLineToFileAsync } from './write-line-to-file-async';

export type writeLinesArrayToFileParams = {
	lines: string[];
	filenamePrefix: FilenamePrefixEnum;
	fileNumber: number;
} & workingDirParam &
	encodingParam;

export async function writeLinesArrayToFile(
	params: writeLinesArrayToFileParams,
) {
	const path = generateFilePath(
		params.workingDir,
		params.filenamePrefix,
		params.fileNumber,
	);
	const fileHandle = await open(path, 'a+');

	for await (const line of params.lines) {
		await writeLineToFileAsync({
			fileEncoding: params.fileEncoding,
			line,
			fileHandle,
		});
	}
	await fileHandle.close();
}
