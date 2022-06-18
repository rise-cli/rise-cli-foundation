import makeIo from '../../index.js'
const io = makeIo({
    type: 'real',
    projectRoot: '/'
})

io.terminal.printSuccessMessage('A Success Message')
