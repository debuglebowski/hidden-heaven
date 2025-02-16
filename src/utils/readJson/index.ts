import { fse } from '../fse';

export async function readJson<T = any>(filePath: string) {
    return fse.readJson(filePath).then((data) => {
        return data as T;
    });
}
