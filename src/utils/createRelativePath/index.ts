import type { Context } from '~/types';
import { relative } from 'node:path';

export function createRelativePath(context: Context, absolutePath: string): string {
    return relative(context.cwd, absolutePath);
}
