const makeCli = require('../src/index.js')
const { deploy } = require('./commands/deploy.js')

module.exports = (terminalState, filesystemState) => {
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
