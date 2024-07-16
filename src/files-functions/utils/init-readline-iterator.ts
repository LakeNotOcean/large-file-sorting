import { createInterface } from 'readline';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';
import { createReadStreamForFile } from './create-read-stream-for-file';

export type initReadlineIteratorParams = {
	filePath: string;
} & encodingParam;

export function initReadlineIterator(
	params: initReadlineIteratorParams,
): AsyncIterableIterator<string> {
	const fileStream = createReadStreamForFile(
		params.filePath,
		params.fileEncoding,
	);
	const readlineInterface = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	return readlineInterface[Symbol.asyncIterator]();
}
