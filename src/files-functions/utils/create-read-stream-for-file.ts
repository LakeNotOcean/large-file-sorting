import { createReadStream, ReadStream } from 'fs';
import { EncodingEnum } from 'src/files-functions/enums/encoding.enum';

export function createReadStreamForFile(
	filePath: string,
	fileEncoding: EncodingEnum,
): ReadStream {
	return createReadStream(filePath, {
		encoding: fileEncoding,
	});
}
