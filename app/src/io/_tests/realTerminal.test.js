const path = require('path')
const { spawn } = require('child_process')

function validateConsoleLog({ file }) {
    const testAppFilePath = path.join(
        process.cwd(),
        '/src/io/_tests/utils/' + file
    )

    return new Promise((res, rej) => {
        const testApp = spawn('node', [testAppFilePath])
        testApp.stdout.on('data', (data) => {
            const stdoutData = data.toString()
            testApp.kill('SIGINT')
            res(stdoutData)
        })
    })
}

function validateTerminalCommand({ file }) {
    const testAppFilePath = path.join(
        process.cwd(),
        '/src/io/_tests/utils/' + file
    )

    return new Promise((res, rej) => {
        const testApp = spawn('node', [testAppFilePath, 'deploy'])
        testApp.stdout.on('data', (data) => {
            const stdoutData = data.toString()
            testApp.kill('SIGINT')
            res(stdoutData)
        })
    })
}

function validateTerminalCommandWithFlag({ file }) {
    const testAppFilePath = path.join(
        process.cwd(),
        '/src/io/_tests/utils/' + file
    )

    return new Promise((res, rej) => {
        const testApp = spawn('node', [
            testAppFilePath,

            'deploy',
            '--stage=prod'
        ])
        testApp.stdout.on('data', (data) => {
            const stdoutData = data.toString()
            testApp.kill('SIGINT')
            res(stdoutData)
        })
    })
}

test('ui.printInfoMessage will log to the console', async () => {
    const text = await validateConsoleLog({
        file: 'runPrintInfoMessage.js'
    })
    expect(text).toBe('\x1B[37m A Info Message\n')
})

test('ui.printSuccessMessage will log to the console', async () => {
    const text = await validateConsoleLog({
        file: 'runPrintSuccessMessage.js'
    })
    expect(text).toBe('\x1B[32m A Success Message\n')
})

test('ui.printErrorMessage will log to the console', async () => {
    const text = await validateConsoleLog({
        file: 'runPrintErrorMessage.js'
    })
    expect(text).toBe('\x1B[31m A Error Message\n')
})

test('io.terminal.makeCommand can be registered and executed', async () => {
    const text = await validateTerminalCommand({
        file: 'executeTerminalCommand.js'
    })
    expect(text).toBe('\x1B[37m command executed\n')
})

test('io.terminal.makeCommand can be executed with command line flags', async () => {
    const text = await validateTerminalCommandWithFlag({
        file: 'executeTerminalCommandWithFlag.js'
    })
    expect(text).toBe('\x1B[37m stage: prod\n')
})
