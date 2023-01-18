import { addCommand, runProgram, printInfoMessage } from '../../index.js'

const flags = [
    {
        flag: '--stage',
        default: 'dev'
    }
]

addCommand({
    command: 'deploy',
    flags,
    action: async (flags) => {
        const stage = flags.stage
        printInfoMessage('stage: ' + stage)
    }
})

runProgram()
