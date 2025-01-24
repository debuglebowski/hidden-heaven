import { delimiter } from '../../../utils';

export function resetContent(content: string) {
    const content__lines = content.split('\n');

    const index__start = content__lines.findIndex((line) => line.includes(delimiter.gitignore.start));
    const index__end = content__lines.findIndex((line) => line.includes(delimiter.gitignore.end));

    const content__new__lines = content__lines.slice(index__start + 1, index__end);
    const content__new = content__new__lines.join('\n');

    return content__new;
}
