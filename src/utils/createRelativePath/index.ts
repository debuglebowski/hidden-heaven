import type { Internals } from '../../types';
import { relative } from 'node:path';

export function createRelativePath(context: Internals.Context, absolutePath: string): string {
    return relative(context.cwd, absolutePath);
}
