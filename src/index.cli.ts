#!/usr/bin/env node

import { runCli } from './run.cli';

void runCli().catch((error: Error) => {
    console.error(error.stack);
});
