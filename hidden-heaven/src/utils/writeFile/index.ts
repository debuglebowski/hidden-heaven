import { formatFile } from '../formatFile';
import type { Internals } from '~/types';
import { fse } from '../fse';

interface Config {
    context: Internals.Context;

    filePath: string;
    content: any;

    shouldFormat: boolean;
}

export async function writeFile(config: Config) {
    const { filePath, content, shouldFormat } = config;

    await fse.ensureFile(filePath);
    await fse.writeFile(filePath, content);

    if (shouldFormat) {
        await formatFile(config);
    }
}
