import { rename } from 'fs/promises';

export async function renameFile(oldPath: string, newPath: string) {
	await rename(oldPath, newPath);
}
