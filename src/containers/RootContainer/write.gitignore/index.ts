import { join } from 'node:path';
import type { RootContainer } from '..';
import { delimiter, fse } from '../../../utils';
import { resetContent } from './index.reset';

export async function write__gitignore(this: RootContainer) {
    const { context, flatTargetItems } = this;

    const ignoreFilePath = join(context.cwd, '.gitignore');

    await fse.ensureFile(ignoreFilePath);

    const content = await fse.readFile(ignoreFilePath, 'utf8').then(resetContent);
    const content__lines = content.trim().split('\n');

    const itemRelativePaths__lines = flatTargetItems.map((item) => item.relativePath);

    const content__new__lines = [
        ...content__lines,
        '',
        delimiter.gitignore.start,
        ...itemRelativePaths__lines,
        delimiter.gitignore.end,
    ];
    const content__new = content__new__lines.join('\n');

    await fse.writeFile(ignoreFilePath, content__new);
}
