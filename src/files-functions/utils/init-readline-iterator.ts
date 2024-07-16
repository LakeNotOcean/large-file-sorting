import { createInterface } from 'readline';
import { encodingParam } from 'src/files-functions/types/encoding-params.type';
import { workingDirParam } from 'src/files-functions/types/working-dir-param.type';
import { createReadStreamForFile } from './create-read-stream-for-file';

export type initReadlineIteratorParams = {
	filename: string;
} & workingDirParam &
	encodingParam;

export function initReadlineIterator(
	params: initReadlineIteratorParams,
): AsyncIterableIterator<string> {
	const fileStream = createReadStreamForFile(
		params.workingDir,
		params.filename,
		params.fileEncoding,
	);
	const readlineInterface = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	return readlineInterface[Symbol.asyncIterator]();
}
