#!/usr/bin/env node

import { runCli } from './run.cli';

void runCli()
    .then(() => {
        console.log('Done!');
    })
    .catch((error: Error) => {
        console.error(error.stack);
    });
