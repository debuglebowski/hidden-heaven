import { join } from 'node:path';
import type { RootContainer } from '..';
import { ensureFile, fse, writeFile } from '~/utils';

const config__default = {
    gitignore: true,
    vscode: true,
};

async function writeConfig(this: RootContainer) {
    const { context } = this;
    const { cwd, sourceFolderName } = context;

    await writeFile({
        context,
        filePath: join(cwd, sourceFolderName, '.hide.json'),
        content: JSON.stringify(config__default, null, 2),
        shouldFormat: true,
    });
}

export async function initFiles(this: RootContainer) {
    const { context } = this;
    const { cwd, sourceFolderName } = context;

    await fse.ensureDir(join(cwd, sourceFolderName));

    await writeConfig.call(this);

    await ensureFile({ filePath: join(cwd, '.gitignore'), content: '' });
    await ensureFile({ filePath: join(cwd, '.vscode.settings.json'), content: '{}' });
}
