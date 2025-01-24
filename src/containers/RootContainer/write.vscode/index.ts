import type { RootContainer } from '..';
import { join } from 'node:path';
import { delimiter, fse, writeFile } from '../../../utils';
import { resetSettings } from './index.reset';

const excludeKey = 'files.exclude';

export async function write__vscode(this: RootContainer) {
    const { context, flatTargetItems } = this;

    const itemNames = flatTargetItems.map((item) => item.name);
    const itemNames__unique = [...new Set(itemNames)];

    const settingsFilePath = join(context.cwd, '.vscode', 'settings.json');

    await fse.ensureFile(settingsFilePath);

    const settings = await fse
        .readJson(settingsFilePath)
        .catch(() => ({})) // If the file is not a json, return an empty object
        .then(resetSettings);

    settings[excludeKey] ||= {};
    settings[excludeKey][delimiter.json.start] = true;

    itemNames__unique.forEach((itemName) => {
        settings[excludeKey][`**/${itemName}`] = true;
    });

    settings[excludeKey][delimiter.json.end] = true;

    await writeFile({
        context,

        filePath: settingsFilePath,
        content: JSON.stringify(settings, null, 2),

        shouldFormat: true,
    });
}
