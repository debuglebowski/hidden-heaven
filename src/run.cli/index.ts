import { RootContainer } from '../containers';
import { run } from '../run';
import { findContext } from './index.config';

export async function runCli() {
    return findContext()
        .then((context) => {
            return RootContainer.fromContext(context);
        })
        .then((rootContainer) => {
            return run(rootContainer);
        });
}
