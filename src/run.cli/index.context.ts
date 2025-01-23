import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { findUp } from '../utils';
import { readJsonFile } from '../utils';
import { cwd, sourceFolderName } from './index.context.args';

async function findContext__package() {
    return findUp('package.json', cwd)
        .then(readJsonFile)
        .then((pkg) => {
            return pkg['hiddenHeaven'] || pkg['hidden-heaven'] || pkg['hide'];
        });
}

async function findContext__files() {
    const childreNames = await readdir(sourceFolderName);

    const configFileName = childreNames.find((childName) => {
        return ['hiddenHeaven.json', 'hidden-heaven.json', 'hide.json', 'hh.json'].includes(childName);
    });

    if (!configFileName) {
        return {};
    }

    const configFilePath = join(sourceFolderName, configFileName);

    return readJsonFile(configFilePath);
}

export async function findContext() {
    const config = await findContext__package().then((data) => {
        return data || findContext__files();
    });

    return { ...config, sourceFolderName, cwd };
}
