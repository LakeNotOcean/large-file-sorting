export function generateFilename(...args: (string | number)[]): string {
	return args.join('_');
}
