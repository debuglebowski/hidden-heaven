import type { RootContainer } from '..';
import { initPackage } from './index.package';
import { findPackagePaths, fse } from '../../../utils';
import { writeConfig } from './index.config';

export async function init(this: RootContainer) {
    const { context } = this;

    await writeConfig.call(this);

    const packagePaths = await findPackagePaths(context);

    await fse.ensureDir(context.sourceFolderName);

    const promises = packagePaths.map((packagePath) => {
        return initPackage.call(this, packagePath);
    });

    await Promise.all(promises);

    // await this.sync();
}
