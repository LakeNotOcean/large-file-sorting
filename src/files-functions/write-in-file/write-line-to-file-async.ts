import { FileHandle } from 'fs/promises';
import { encodingParam } from '../types/encoding-param.type';

export type writeLineLineToFileAsyncParams = {
	line: string;
	fileHandle: FileHandle;
} & encodingParam;

export async function writeLineToFileAsync(
	params: writeLineLineToFileAsyncParams,
) {
	await params.fileHandle.appendFile(params.line, {
		encoding: params.fileEncoding,
	});
	await params.fileHandle.appendFile('\n', { encoding: params.fileEncoding });
}
