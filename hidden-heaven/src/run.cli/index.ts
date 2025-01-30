import { RootContainer } from '~/containers';
import { run } from '../run';
import { initContext } from '../utils';

export async function runCli() {
    const rootContainer = await initContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    const { isClean, initMode } = rootContainer.context;

    if (isClean) {
        return rootContainer.clean();
    }

    if (initMode) {
        return rootContainer.init();
    }

    return run(rootContainer);
}
