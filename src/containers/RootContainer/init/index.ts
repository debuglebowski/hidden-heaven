import { RootContainer } from '..';
import { initFiles } from './index.config';
import { initPackage } from './index.package';
import { execSync, findPackagePaths, fse } from '~/utils';

export async function init(this: RootContainer) {
    const { context } = this;

    await initFiles.call(this);

    const packagePaths = await findPackagePaths(context);

    await fse.ensureDir(context.sourceFolderName);

    const initPromises = packagePaths.map((packagePath) => {
        return initPackage.call(this, packagePath);
    });

    await Promise.all(initPromises);

    execSync(['git', 'add', '.']);

    /**
     * This is in order to get a fresh take on the context - with the new file structure.
     */
    await RootContainer.init().then((root) => {
        // return root.sync();
    });
}
