import { dirname, join } from 'path';
import { fse } from '../fse';

export async function findUp(name: string, cwd: string) {
    const children = await fse.readdir(cwd, { withFileTypes: true });

    for (const child of children) {
        if (child.name === name) {
            return join(child.parentPath, child.name);
        }
    }

    return findUp(name, dirname(cwd));
}
