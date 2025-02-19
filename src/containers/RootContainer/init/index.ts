import { RootContainer } from '..';
import { initFiles } from './index.config';
import { fse } from '~/utils';

export async function init(this: RootContainer) {
    const { context } = this;

    await initFiles.call(this);

    await fse.ensureDir(context.linkFolderName);

    /**
     * This is in order to get a fresh take on the context - with the new file structure.
     */
    await RootContainer.init().then((root) => {
        return root.sync();
    });
}
