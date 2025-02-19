import { describe } from 'vitest';
import { runFixture } from 'test/__factory';

describe('basic', () => {
    runFixture({
        name: 'basic',

        runArgs: [],

        packages: {
            '.': {
                linkedFileNames: {
                    included: ['.vscode', '.nxihfq', 'mfoqw.json', '.gitignore'],
                    excluded: ['package.json'],
                },
            },
            'src/nested/folder': {
                linkedFileNames: {
                    included: ['.ndomqw', 'jfoqwjo.json'],
                    excluded: ['package.json'],
                },
            },
        },
    });
});
