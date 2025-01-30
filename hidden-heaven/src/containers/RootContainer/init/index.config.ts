import type { RootContainer } from '..';
import { createPaths, ensureFile, fse, writeFile } from '~/utils';

const config__default = {
    gitignore: true,
    vscode: true,
};

async function writeConfig(this: RootContainer) {
    const { context } = this;

    const paths = createPaths(context);

    await writeFile({
        context,
        filePath: paths.defaultConfigFile,
        content: JSON.stringify(config__default, null, 2),
        shouldFormat: true,
    });
}

export async function initFiles(this: RootContainer) {
    const { context } = this;

    const paths = createPaths(context);

    await fse.ensureDir(paths.sourceFolder);

    await writeConfig.call(this);

    await ensureFile({ filePath: paths.gitignore, content: '' });
    await ensureFile({ filePath: paths.vscode.settings, content: '{}' });
}
