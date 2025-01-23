import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { findUp } from '../utils';
import { readJsonFile } from '../utils';
import { cwd, sourceFolderName__default } from './index.context.args';

type Dictionary = Record<string, any>;
type Dictionary__Optional = Record<string, any> | undefined;

async function findContext__package() {
    return findUp('package.json', cwd)
        .then((filePath) => {
            return readJsonFile<Dictionary>(filePath);
        })
        .then((pkg) => {
            return pkg['hiddenHeaven'] || pkg['hidden-heaven'] || pkg['hide'];
        })
        .then((context) => {
            return context as Dictionary__Optional;
        });
}

async function findContext__files() {
    const childreNames = await readdir(sourceFolderName__default);

    const configFileName = childreNames.find((childName) => {
        return ['hiddenHeaven.json', 'hidden-heaven.json', 'hide.json', 'hh.json'].includes(childName);
    });

    if (configFileName) {
        const configFilePath = join(sourceFolderName__default, configFileName);

        return readJsonFile<Dictionary>(configFilePath);
    }

    return undefined;
}

export async function findContext() {
    const context = await findContext__package().then((ctx) => {
        return ctx || findContext__files();
    });

    const sourceFolderName = context?.sourceFolderName || sourceFolderName__default;

    return { ...context, sourceFolderName, cwd };
}
