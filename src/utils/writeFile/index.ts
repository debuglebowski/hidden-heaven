import { writeFile as __writeFile } from 'node:fs/promises';
import { formatFile } from '../formatFile';
import type { Internals } from '../../types';

interface Config {
    context: Internals.Context;

    filePath: string;
    content: any;

    shouldFormat: boolean;
}

export async function writeFile(config: Config) {
    const { filePath, content, shouldFormat } = config;

    await __writeFile(filePath, content, { flag: 'w', encoding: 'utf8' });

    if (shouldFormat) {
        await formatFile(config);
    }
}
