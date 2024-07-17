import { ConfigService } from 'src/config/config.service';
import { littleConsoleLogger } from './little-console-logger';

export const memoryUsageUtil = (function () {
	const formatMemoryUsage = (data: number) =>
		`${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

	const memoryData = process.memoryUsage();
	const configService = new ConfigService();
	const isPrintMemoryUsage =
		configService.getOrThrow<boolean>('printMemoryUsage');

	const memoryUsage = {
		message: 'memory usage print',
		rss: `${formatMemoryUsage(
			memoryData.rss,
		)} -> Resident Set Size - total memory allocated for the process execution`,
		heapTotal: `${formatMemoryUsage(
			memoryData.heapTotal,
		)} -> total size of the allocated heap`,
		heapUsed: `${formatMemoryUsage(
			memoryData.heapUsed,
		)} -> actual memory used during the execution`,
		external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
	};
	return {
		printMemoryUsage: function (message?: string) {
			if (!isPrintMemoryUsage) {
				return;
			}
			if (message) {
				memoryUsage.message = message;
			}
			littleConsoleLogger.log(JSON.stringify(memoryUsage));
		},
	};
})();
