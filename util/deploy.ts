import * as fsx from 'fs-extra';
import { runChildProcessAsync } from './helpers';

/**
 * Rebuilds the react app, and copies the output to docs/.
 * Used for github-pages deployment.
 */
async function deploy() {
    console.log('Deleting docs/...');
    await fsx.rmdir('docs/', { recursive: true });

    console.log('Building...');
    await runChildProcessAsync('npm run build');

    console.log('Copying build/ to docs/...');
    await fsx.copy('build/', 'docs/', { recursive: true });

    console.log('Adding docs/.nojekyll for github pages...');
    await fsx.writeFile('docs/.nojekyll', '', { encoding: 'utf-8' });

    console.log('Done.');
}

deploy();
