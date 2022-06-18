import makeCli from '../src/index.js'
import { deploy } from './commands/deploy.js'

export default (projectRoot) => {
    /**
     * Setup CLI
     */
    const cli = makeCli({
        type: 'real',
        projectRoot: projectRoot
    })

    /**
     * Setup CLI Commands
     */
    const flags = [
        {
            flag: '--stage',
            default: 'dev'
        }
    ]

    cli.terminal.makeCommand({
        command: 'deploy',
        description: 'Des',
        flags: flags,
        action: (flags) => {
            deploy(cli, flags)
        }
    })

    /**
     * Start
     */
    return cli.terminal.start
}
