import type { Internals } from '~/types';
import { tryExecBin } from '../tryExecBin';

interface Config {
    context: Internals.Context;

    filePath: string;
}

export async function formatFile(config: Config) {
    const { filePath, context } = config;
    const { runtime = 'npm', prettier = true, eslint = true } = context.format || {};

    if (prettier) {
        tryExecBin({ runtime, bin: 'prettier', args: ['--write', filePath] });
    }

    if (eslint) {
        tryExecBin({ runtime, bin: 'eslint', args: ['--fix', filePath] });
    }
}
