import type { Context } from '~/types';
import { tryExecBin } from '../tryExecBin';

interface Config {
    context: Context;

    filePath: string;
}

export async function formatFile(config: Config) {
    const { filePath, context } = config;
    const { runtime = 'node', prettier = true, eslint = true } = context.format || {};

    if (prettier) {
        await tryExecBin({ runtime, bin: 'prettier', args: ['--write', filePath] });
    }

    if (eslint) {
        await tryExecBin({ runtime, bin: 'eslint', args: ['--fix', filePath] });
    }
}
