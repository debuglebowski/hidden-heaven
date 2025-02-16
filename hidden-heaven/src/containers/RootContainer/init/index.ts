import { RootContainer } from '..';
import { initFiles } from './index.config';
import { initPackage } from './index.package';
import { fse } from '~/utils';

export async function init(this: RootContainer) {
    const { context } = this;

    await initFiles.call(this);

    await fse.ensureDir(context.linkFolderName);

    // const initPromises = packagePaths.map((packagePath) => {
    //     return initPackage.call(this, packagePath);
    // });

    // await Promise.all(initPromises);

    /**
     * Since the original files probably already are commited, we need to add them as deleted before we symlink them again.
     * Otherwise, the .gitignore updates will not have any effect.
     */
    // execSync(['git', 'add', '.']);

    /**
     * This is in order to get a fresh take on the context - with the new file structure.
     */
    await RootContainer.init().then((root) => {
        return root.sync();
    });
}
