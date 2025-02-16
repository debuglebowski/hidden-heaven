import { RootContainer } from '~/containers';
import { run } from '../run';
import { initContext } from '../utils';

export async function runCli() {
    const rootContainer = await initContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    const { isClean, isReset, initMode } = rootContainer.context;

    if (isClean) {
        return rootContainer.clean();
    }

    if (isReset) {
        return rootContainer.reset();
    }

    if (initMode) {
        return rootContainer.init();
    }

    return run(rootContainer);
}
