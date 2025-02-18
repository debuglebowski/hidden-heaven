import { runFixture } from 'test/__factory';

runFixture({
    name: 'named',
    args: ['--link-folder-name', '.files'],

    packages: {
        '.': {
            linkedFileNames: {
                included: ['jiqhwd'],
                excluded: ['src', 'test'],
            },
        },
    },
});
