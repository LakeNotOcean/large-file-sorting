import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { EncodingEnum } from 'src/files-functions/enums/encoding.enum';

export function createReadStreamForFile(
	workingDir: string,
	filename: string,
	fileEncoding: EncodingEnum,
): ReadStream {
	return createReadStream(join(workingDir, filename), {
		encoding: fileEncoding,
	});
}
