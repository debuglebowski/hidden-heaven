import { fse } from '../fse';

interface Config {
    filePath: string;
    content: string;
}

export async function ensureFile(config: Config) {
    const { filePath, content } = config;

    await fse.ensureFile(filePath);

    const currentContent = await fse.readFile(filePath);

    if (!currentContent) {
        await fse.writeFile(filePath, content);
    }
}
