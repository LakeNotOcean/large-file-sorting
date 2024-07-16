import { writeSync } from 'fs';
import { encodingParam } from 'src/files-functions/types/encoding-param.type';

export type writeLineLineToFileParams = {
	fd: number;
	line: string;
} & encodingParam;

export function writeLineToFile(params: writeLineLineToFileParams) {
	writeSync(params.fd, params.line, null, params.fileEncoding);
	writeSync(params.fd, '\n', null, params.fileEncoding);
}
