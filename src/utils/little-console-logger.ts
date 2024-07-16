export const littleConsoleLogger = (function () {
	const logWithDateMessageFormat = (message: string) =>
		`${new Date().toISOString()}: ${message}`;
	return {
		log: function (message: string) {
			console.log(logWithDateMessageFormat(message));
		},
		warn: function (message: string) {
			console.warn(logWithDateMessageFormat(message));
		},
		error: function (message: string) {
			console.error(logWithDateMessageFormat(message));
		},
	};
})();
