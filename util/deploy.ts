import * as fsx from 'fs-extra';
import { runChildProcessAsync } from './helpers';

/**
 * Rebuilds the react app, and copies the output to docs/.
 * Used for github-pages deployment.
 */
async function deploy() {
    console.log('Building...');
    await runChildProcessAsync('npm run build');

    console.log('Deleting docs/...');
    await fsx.rmdir('docs/', { recursive: true });

    console.log('Copying build/ to docs/...');
    await fsx.copy('build/', 'docs/', { recursive: true });

    console.log('Done.');
}

deploy();
