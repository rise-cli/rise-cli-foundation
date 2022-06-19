const makeIO = require('../../index.js')

const io = makeIO({
    type: 'real'
})

io.terminal.makeCommand({
    command: 'deploy',
    action: () => {
        io.terminal.printInfoMessage('command executed')
    }
})

io.terminal.start()
