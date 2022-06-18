import makeIo from '../../index.js'

const io = makeIo({
    type: 'real',
    projectRoot: '/'
})

io.terminal.printInfoMessage('A Info Message')
