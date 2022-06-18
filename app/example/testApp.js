import makeCli from '../src/index.js'
import { deploy } from './commands/deploy.js'

export default (terminalState, filesystemState) => {
    /**
     * Setup CLI
     */
    const cli = makeCli({
        type: 'mock',
        terminalState,
        filesystemState
    })

    /**
     * Setup CLI Commands
     */
    cli.terminal.makeCommand({
        command: 'deploy',
        description: 'Des',
        action: (flags) => deploy(cli, flags)
    })

    return cli.terminal.execute
}
