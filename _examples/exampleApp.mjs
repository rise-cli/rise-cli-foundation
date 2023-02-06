#! /usr/bin/env node
import * as cli from 'rise-cli-foundation'
const flags = [
    {
        flag: '--stage',
        default: 'dev'
    }
]

cli.addCommand({
    command: 'deploy',
    flags,
    action: async (flags) => {
        const stage = flags.stage
        cli.printInfoMessage('stage: ' + stage)
    }
})

cli.runProgram()
