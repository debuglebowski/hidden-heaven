import { fse } from '../fse';
import { parseJson } from '../parseJson';

export async function readJson<T = any>(filePath: string) {
    const content = await fse.readFile(filePath, 'utf8');

    return parseJson(content) as T;
}
