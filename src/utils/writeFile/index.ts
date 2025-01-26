import { formatFile } from '../formatFile';
import type { Internals } from '../../types';
import { fse } from '../fse';

interface Config {
    context: Internals.Context;

    filePath: string;
    content: any;

    shouldFormat: boolean;
}

export async function writeFile(config: Config) {
    const { filePath, content, shouldFormat } = config;

    await fse.writeFile(filePath, content, { flag: 'w', encoding: 'utf8' });

    if (shouldFormat) {
        await formatFile(config);
    }
}
