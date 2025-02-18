import { RootContainer } from '~/containers';
import { initContext } from '../utils';

export async function runCli() {
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
