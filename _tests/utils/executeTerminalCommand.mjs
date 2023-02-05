import { addCommand, runProgram } from '../../index.mjs'

addCommand({
    command: 'deploy',
    action: async () => {
        console.log('command executed')
    },
    flags: []
})

runProgram()
