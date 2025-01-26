import { RootContainer } from '../containers';
import { run } from '../run';
import { findContext } from './index.context';
import { isClean, initMode } from './index.context.args';

export async function runCli() {
    const rootContainer = await findContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    if (isClean) {
        return rootContainer.clean();
    }

    if (initMode) {
        return rootContainer.init();
    }

    return run(rootContainer);
}
