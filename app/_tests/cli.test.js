import path from 'path'
import { spawn } from 'child_process'
import test from 'node:test'
import assert from 'assert'

function validateConsoleLog({ file }) {
    const testAppFilePath = path.join(process.cwd(), '/_tests/utils/' + file)

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
    const testAppFilePath = path.join(process.cwd(), '/_tests/utils/' + file)

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
    const testAppFilePath = path.join(process.cwd(), '/_tests/utils/' + file)

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
    assert.strictEqual(text, 'A Info Message\n')
})

test('ui.printSuccessMessage will log to the console', async () => {
    const text = await validateConsoleLog({
        file: 'runPrintSuccessMessage.js'
    })
    assert.strictEqual(text, '\x1B[32mA Success Message\x1B[37m\n')
})

test('ui.printErrorMessage will log to the console', async () => {
    const text = await validateConsoleLog({
        file: 'runPrintErrorMessage.js'
    })
    assert.strictEqual(text, '\x1B[31mA Error Message\x1B[37m\n')
})

test('io.terminal.makeCommand can be registered and executed', async () => {
    const text = await validateTerminalCommand({
        file: 'executeTerminalCommand.js'
    })
    assert.strictEqual(text, 'command executed\n')
})

test('io.terminal.makeCommand can be executed with command line flags', async () => {
    const text = await validateTerminalCommandWithFlag({
        file: 'executeTerminalCommandWithFlag.js'
    })
    assert.strictEqual(text, 'stage: prod\n')
})
