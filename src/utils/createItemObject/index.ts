import type { Context, Item } from '~/types';
import { createRelativePath } from '~/utils';
import { basename } from 'node:path';

export function createItemObject<T>(context: Context, absolutePath: string, extra: T): Item & T {
    return {
        name: basename(absolutePath),

        absolutePath: absolutePath,
        relativePath: createRelativePath(context, absolutePath),

        ...extra,
    };
}
