import { addCommand, runProgram } from '../../index.mjs'

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
        console.log('stage: ' + stage)
    }
})

runProgram()
