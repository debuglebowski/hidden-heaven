import { RootContainer } from '~/containers';

export async function run(rootContainer: RootContainer) {
    await rootContainer.sync();
}
