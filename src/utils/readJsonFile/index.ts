import { readFile } from 'node:fs/promises';

export async function readJsonFile<T = any>(filePath: string) {
    return readFile(filePath, 'utf-8').then((data) => {
        return JSON.parse(data) as T;
    });
}
