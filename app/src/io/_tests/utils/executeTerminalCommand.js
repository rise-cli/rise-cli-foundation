import makeIo from '../../index.js'

const io = makeIo({
    type: 'real'
})

io.terminal.makeCommand({
    command: 'deploy',
    action: () => {
        io.terminal.printInfoMessage('command executed')
    }
})

io.terminal.start()
