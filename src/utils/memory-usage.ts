import { ConfigService } from 'src/config/config.service';
import { littleConsoleLogger } from './little-console-logger';

const formatMemoryUsage = (data: number) =>
	`${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

const getMemoryUsage = () => {
	const memoryData = process.memoryUsage();
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
	return memoryUsage;
};
export const memoryUsageUtil = (function () {
	process.memoryUsage();
	const configService = new ConfigService();
	const isPrintMemoryUsage =
		configService.getOrThrow('printMemoryUsage') === 'true';
	return {
		printMemoryUsage: function (message?: string) {
			if (!isPrintMemoryUsage) {
				return;
			}
			const memoryUsage = getMemoryUsage();
			if (message) {
				memoryUsage.message = message;
			}
			littleConsoleLogger.log(JSON.stringify(memoryUsage));
		},
	};
})();
