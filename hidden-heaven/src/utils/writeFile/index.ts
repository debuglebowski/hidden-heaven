import { formatFile } from '../formatFile';
import type { Context } from '~/types';
import { fse } from '../fse';

interface Config {
    context: Context;

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
