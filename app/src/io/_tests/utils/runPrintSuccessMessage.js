const makeIO = require('../../index.js')
const io = makeIO({
    type: 'real',
    projectRoot: '/'
})

io.terminal.printSuccessMessage('A Success Message')
