import type { HiddenHeaven } from '~/types';
import type { RootContainer } from '..';
import { createPaths, ensureFile, fse, writeFile } from '~/utils';

const config__default: HiddenHeaven.InputConfig = {
    find: {
        packages: {
            include: ['**/package.json'],
            exclude: [],
        },
        items: {
            include: ['.*', '**/*'],
            exclude: ['package.json'],
        },
    },
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

    await fse.ensureDir(paths.linkFolder);

    await writeConfig.call(this);

    await ensureFile({ filePath: paths.vscodeSettingsFile, content: '{}' });
}
