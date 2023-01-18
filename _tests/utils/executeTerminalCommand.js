import { addCommand, runProgram, printInfoMessage } from '../../index.js'

addCommand({
    command: 'deploy',
    action: async () => {
        printInfoMessage('command executed')
    },
    flags: []
})

runProgram()
