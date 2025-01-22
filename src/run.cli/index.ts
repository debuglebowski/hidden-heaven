import { run } from '../run';
import { findConfig } from './index.config';

export async function runCli() {
    return findConfig().then(run);
}
