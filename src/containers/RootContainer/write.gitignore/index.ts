import { join } from 'node:path';
import type { RootContainer } from '..';
import { fse } from '../../../utils';
import { resetContent } from './index.reset';

export async function write__gitignore(this: RootContainer) {
    const { context, flatTargetItems } = this;

    const itemNames = flatTargetItems.map((item) => item.name);
    const itemNames__unique = [...new Set(itemNames)];

    const ignoreFilePath = join(context.cwd, '.gitignore');

    await fse.ensureFile(ignoreFilePath);

    const content = await fse.readFile(ignoreFilePath, 'utf8').then(resetContent);
    const content__lines = content.split('\n');

    const itemNames__lines = itemNames__unique.map((itemName) => `**/${itemName}`);

    const content__new__lines = [...content__lines, ...itemNames__lines];
    const content__new = content__new__lines.join('\n');

    await fse.writeFile(ignoreFilePath, content__new);
}
