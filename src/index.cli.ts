#!/usr/bin/env node

import { RootContainer } from '~/containers';
import { initContext, print, printError } from '~/utils';

async function runCli() {
    const rootContainer = await initContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    const { context } = rootContainer;
    const { isReset, isShow, initMode } = context;

    if (isReset) {
        return rootContainer.reset();
    }

    if (isShow) {
        return rootContainer.show();
    }

    if (initMode) {
        return rootContainer.init();
    }

    return rootContainer.sync();
}

void runCli()
    .then(() => {
        print('Done!');
    })
    .catch((error: Error) => {
        printError('hidden-heaven failed', error);
    });
