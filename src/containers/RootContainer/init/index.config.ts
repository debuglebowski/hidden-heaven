import { join } from 'node:path';
import type { RootContainer } from '..';
import { writeFile } from '~/utils';

const config__default = {
    gitignore: true,
    vscode: true,
};

export async function writeConfig(this: RootContainer) {
    const { context } = this;
    const { cwd, sourceFolderName } = context;

    await writeFile({
        context,
        filePath: join(cwd, sourceFolderName, '.hide.json'),
        content: JSON.stringify(config__default, null, 2),
        shouldFormat: true,
    });
}
