import { delimiter } from '../../../utils';

function createFilteredLines(content: string) {
    const content__lines = content.split('\n');

    const index__start = content__lines.findIndex((line) => line.includes(delimiter.gitignore.start));
    const index__end = content__lines.findIndex((line) => line.includes(delimiter.gitignore.end));

    if (index__start === -1 || index__end === -1) {
        return content__lines;
    }

    const content__lines__start = content__lines.slice(0, index__start);
    const content__lines__end = content__lines.slice(index__end + 1);

    return [...content__lines__start, ...content__lines__end];
}

export function resetContent(content: string) {
    return createFilteredLines(content).join('\n');
}
