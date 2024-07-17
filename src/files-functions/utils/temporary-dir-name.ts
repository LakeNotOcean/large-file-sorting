import { randomUUID } from 'crypto';

export const temporaryDirName = (function () {
	const temporaryDirName = randomUUID();
	return {
		get: function () {
			return temporaryDirName;
		},
	};
})();
