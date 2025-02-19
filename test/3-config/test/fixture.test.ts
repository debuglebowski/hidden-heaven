import { runFixture } from 'test/__factory';
import { describe } from 'vitest';

describe('Config', () => {
    runFixture({
        name: 'config',

        runArgs: [],

        packages: {
            '.': {
                linkedFileNames: {
                    included: ['.vscode', '.hide.js', '.dqnidw.json', '.gitignore'],
                    excluded: ['package.json'],
                },
            },
            'src/nested/folder': {
                linkedFileNames: {
                    included: ['.qwe.json'],
                    excluded: ['package.json'],
                },
            },
        },
    });
});
