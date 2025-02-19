import { runFixture } from 'test/__factory';
import { describe } from 'vitest';

describe('Named', () => {
    runFixture({
        name: 'named',

        runArgs: [],

        linkFolderName: '.files',

        packages: {
            '.': {
                linkedFileNames: {
                    included: ['.vscode', 'jiqhwd', 'modwq.json'],
                    excluded: ['package.json'],
                },
            },
            'src/nested/folder': {
                linkedFileNames: {
                    included: ['qniwnd.json'],
                    excluded: ['package.json'],
                },
            },
        },
    });
});
