import { RootContainer } from '../containers';
import { run } from '../run';
import { findContext } from './index.context';
import { clean } from './index.context.args';

export async function runCli() {
    const rootContainer = await findContext().then((context) => {
        return RootContainer.fromContext(context);
    });

    console.log({ clean });

    if (clean) {
        return rootContainer.clean();
    }

    return run(rootContainer);
}
