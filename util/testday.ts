import { ArgumentParser } from 'argparse';
import child_process from 'child_process';

async function parseArgs() {
    const parser = new ArgumentParser({
        description: 'Test solutions',
        add_help: true,
    });

    parser.add_argument('days', {
        help: 'Test a single day or multiple days.',
        metavar: 'days', default: undefined, type: 'int', nargs: '*'
    });
    const args = parser.parse_args();

    let testParams = '-- ';
    if (args.days && args.days.length > 0) {
        const days: number[] = args.days;
        testParams += days.map(x => `src/tests/solutions/day${x.toString().padStart(2, '0')}.spec.ts`).join(' ');
        console.log(`Testing solutions for days: ${days.join(', ')}`);
    } else {
        testParams += '--watchAll';
        console.log('Testing all solutions.');
    }

    child_process.spawn('cmd', ['/c', 'npm run test ' + testParams], { stdio: 'inherit' });
}

parseArgs();
