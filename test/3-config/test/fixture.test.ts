import { runFixture } from 'test/__factory';

runFixture({
    name: 'config',
    args: [],

    packages: {
        '.': {
            linkedFileNames: {
                included: ['.vscode', '.hide.js', '.dqnidw.json', '.gitignore'],
                excluded: ['test', 'src'],
            },
        },
    },
});
