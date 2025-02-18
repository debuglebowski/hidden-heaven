#!/usr/bin/env node

import { RootContainer } from '~/containers';
import { initContext } from '~/utils';

async function runCli() {
    const rootContainer = await initContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    const { context } = rootContainer;
    const { isReset, initMode } = context;

    if (isReset) {
        return rootContainer.reset();
    }

    if (initMode) {
        return rootContainer.init();
    }

    return rootContainer.sync();
}

void runCli()
    .then(() => {
        console.log('Done!');
    })
    .catch((error: Error) => {
        console.error('hidden-heaven failed');
        console.error(error.stack);
    });
