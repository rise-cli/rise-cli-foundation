const makeIO = require('../index.js')

test('mockTerminal.printInfoMessage will log to the console', () => {
    let state = []
    const io = makeIO({
        type: 'mock',
        terminalState: state,
        filesystemState: {}
    })

    io.terminal.printInfoMessage('Info Message')
    expect(state[0]).toBe('Info Message')

    io.terminal.clear()
    io.terminal.printSuccessMessage('Success Message')
    expect(state[0]).toBe('Success Message')

    io.terminal.clear()
    io.terminal.printErrorMessage('Error Message')
    expect(state[0]).toBe('Error Message')
})

test('mockTerminal with throw an error if terminalState is not included ', () => {
    expect(() => {
        makeIO({
            type: 'mock'
        })
    }).toThrow('Mock io must include "terminalState"')

    expect(() => {
        makeIO({
            type: 'mock',
            terminalState: 'not an array'
        })
    }).toThrow('Mock io must include "terminalState"')
})

test('mockTerminal with throw an error if filesystemState is not included ', () => {
    expect(() => {
        makeIO({
            type: 'mock',
            terminalState: []
        })
    }).toThrow('Mock io must include "filesystemState"')

    expect(() => {
        makeIO({
            type: 'mock',
            terminalState: [],
            filesystemState: 'not an array'
        })
    }).toThrow('Mock io must include "filesystemState"')
})

test('mockTerminal can make a command and execute it', () => {
    let state = []
    const io = makeIO({
        type: 'mock',
        terminalState: state,
        filesystemState: {}
    })

    const deployFunction = (terminal) => {
        terminal.printInfoMessage('info')
    }

    io.terminal.makeCommand({
        command: 'deploy',
        action: () => deployFunction(io.terminal)
    })

    io.terminal.execute('deploy')
    expect(state[0]).toEqual('info')
})

test('mockTerminal can execute command with flags', () => {
    let state = []
    const io = makeIO({
        type: 'mock',
        terminalState: state,
        filesystemState: {}
    })

    const deployFunction = (flags, terminal) => {
        terminal.printInfoMessage('stage: ' + flags.stage)
        terminal.printInfoMessage('region: ' + flags.region)
        terminal.printInfoMessage('color: ' + flags.color)
    }

    const flags = [
        {
            flag: '--stage',
            default: 'dev'
        },
        {
            flag: '--region',
            default: 'us-east-1'
        },
        {
            flag: '--color',
            default: 'blue'
        }
    ]

    io.terminal.makeCommand({
        command: 'deploy',
        flags,
        action: (flags) => {
            deployFunction(flags, io.terminal)
        }
    })

    io.terminal.execute('deploy --stage=dev --region us-east-1')
    expect(state).toEqual(['stage: dev', 'region: us-east-1', 'color: blue'])
})
