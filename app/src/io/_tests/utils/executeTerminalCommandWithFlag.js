const makeIO = require('../../index.js')
const io = makeIO({
    type: 'real'
})

const flags = [
    {
        flag: '--stage',
        default: 'dev'
    }
]

io.terminal.makeCommand({
    command: 'deploy',
    flags,
    action: (flags) => {
        const stage = flags.stage
        io.terminal.printInfoMessage('stage: ' + stage)
    }
})

io.terminal.start()
