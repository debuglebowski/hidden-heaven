#! /usr/bin/env bun

import { runFromCli } from '../run';
import { sourceFolderName } from './index.args';

export function runCli() {
    runFromCli({ sourceFolderName });
}
