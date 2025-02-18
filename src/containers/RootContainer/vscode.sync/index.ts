import type { RootContainer } from '..';
import { delimiter, writeFile } from '~/utils';
import { vscode__reset } from '../vscode.reset/index.reset';

const excludeKey = 'files.exclude';

export async function vscode__sync(this: RootContainer) {
    const { context, flatSourceItems } = this;

    const { settings, settingsFilePath } = await vscode__reset.call(this);

    settings[excludeKey] ||= {};
    settings[excludeKey][delimiter.json.start] = true;

    flatSourceItems.forEach((item) => {
        settings[excludeKey][item.relativePath] = true;
    });

    settings[excludeKey][delimiter.json.end] = true;

    await writeFile({
        context,

        filePath: settingsFilePath,

        content: JSON.stringify(settings, null, 2),

        shouldFormat: true,
    });

    return { settings, settingsFilePath };
}
