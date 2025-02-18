import { createPaths, delimiter, fse, writeFile } from '~/utils';
import type { RootContainer } from '..';

type Settings = Record<string, any>;

function createFilteredLines(settings: Settings) {
    const settings__string = JSON.stringify(settings, null, 2);
    const settings__string__lines = settings__string.split('\n');

    const index__start = settings__string__lines.findIndex((line) => line.includes(delimiter.json.start));
    const index__end = settings__string__lines.findIndex((line) => line.includes(delimiter.json.end));

    if (index__start === -1 || index__end === -1) {
        return settings__string__lines;
    }

    const settings__string__lines__start = settings__string__lines.slice(0, index__start);
    const settings__string__lines__end = settings__string__lines.slice(index__end + 1);

    return [...settings__string__lines__start, ...settings__string__lines__end];
}

export async function vscode__reset(this: RootContainer) {
    const { context } = this;

    const settingsFilePath = createPaths(context).vscodeSettingsFile;

    await fse.ensureFile(settingsFilePath);

    const settings__raw = await fse.readJson(settingsFilePath);

    const settings__string__filtered__lines = createFilteredLines(settings__raw);
    const settings__string__filtered = settings__string__filtered__lines.join('\n');

    const settings = JSON.parse(settings__string__filtered);

    await writeFile({
        context,

        filePath: settingsFilePath,

        content: settings,

        shouldFormat: true,
    });

    return { settings, settingsFilePath };
}
