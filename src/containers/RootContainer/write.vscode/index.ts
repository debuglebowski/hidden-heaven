import type { RootContainer } from '..';
import { delimiter, fse, writeFile, createPaths } from '../../../utils';
import { resetSettings } from './index.reset';

const excludeKey = 'files.exclude';

export async function write__vscode(this: RootContainer) {
    const { context, flatTargetItems } = this;

    const settingsFilePath = createPaths(context).vscode.settings;

    await fse.ensureFile(settingsFilePath);

    const settings = await fse
        .readJson(settingsFilePath)
        .catch(() => ({})) // If the file is not a json, return an empty object
        .then(resetSettings);

    settings[excludeKey] ||= {};
    settings[excludeKey][delimiter.json.start] = true;

    flatTargetItems.forEach((item) => {
        settings[excludeKey][item.relativePath] = true;
    });

    settings[excludeKey][delimiter.json.end] = true;

    await writeFile({
        context,

        filePath: settingsFilePath,
        content: JSON.stringify(settings, null, 2),

        shouldFormat: true,
    });
}
