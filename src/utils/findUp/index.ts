import { dirname, join } from 'path';
import { fse } from '../fse';

export async function findUp(childPath: string, cwd: string) {
    const fullPath = join(cwd, childPath);

    if (fse.existsSync(fullPath)) {
        return fullPath;
    }

    return findUp(childPath, dirname(cwd));
}
