import { readdir } from 'node:fs/promises';
import { dirname, join } from 'path';

export async function findUp(name: string, cwd = process.cwd()) {
    const children = await readdir(cwd, { withFileTypes: true });

    for (const child of children) {
        if (child.name === name) {
            return join(child.parentPath, child.name);
        }
    }

    return findUp(name, dirname(cwd));
}
