/* 
makeDir
getDirectories
copyDirectory

getFile
getJsFile
writeFile
getProjectPath
copyFile

*/

const makeIO = require('../index.js')

test('realFilesystem can read, create, and delete directories', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/makeDir'
    })

    const res = io.filesystem.getDirectories('/')
    expect(res).toEqual([])

    await io.filesystem.makeDir('/example')

    // creating again wont throw an error
    await io.filesystem.makeDir('/example')

    const res2 = io.filesystem.getDirectories('/')
    expect(res2).toEqual(['example'])
    io.filesystem.removeDir('/example')
})

test('realFilesystem will throw error if no path is given', () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/makeDir'
    })

    expect(() => {
        io.filesystem.getDirectories()
    }).toThrow('getDirections requires a path')
})

test('realFilesystem can copy a directory with files in it', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/copyDir'
    })

    io.filesystem.copyDir({
        source: '/source',
        target: '/target'
    })

    const res = io.filesystem.getDirectories('/')
    expect(res).toEqual(['source', 'target'])

    const fileA = await io.filesystem.getFile('/target/fileA.txt')
    expect(fileA).toBeTruthy()

    const fileB = await io.filesystem.getFile('/target/fileA.txt')
    expect(fileB).toBeTruthy()

    io.filesystem.removeDir('/target')
})

test('realFilesystem can get a js file', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/jsDir'
    })

    const app = await io.filesystem.getJsFile('/app.js')

    expect(app.name).toBe('example-app')
})

test('realFilesystem can write a file', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/writeFile'
    })

    io.filesystem.writeFile({
        path: '/fileA.js',
        content: 'module.exports = {name: "made-app"}'
    })

    const app = await io.filesystem.getJsFile('/fileA.js')
    expect(app.name).toBe('made-app')
    io.filesystem.removeFile('/fileA.js')
})

test('realFilesystem can copy files', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/copyFile'
    })

    io.filesystem.copyFile({
        source: '/source/fileA.js',
        target: '/target/fileA.js'
    })

    const app = await io.filesystem.getJsFile('/target/fileA.js')
    expect(app.name).toBe('copy-app')
    io.filesystem.removeFile('/target/fileA.js')
})

test('realFilesystem can make a zip a folder', async () => {
    const io = makeIO({
        type: 'real',
        projectRoot: __dirname + '/fsScenarios/zip'
    })

    await io.filesystem.zipFolder({
        source: '/source',
        target: '/target',
        name: 'lambdaCode'
    })

    const x = await io.filesystem.getFile('/target/lambdaCode.zip')

    expect(x).toBeTruthy()
    io.filesystem.removeFile('/target/lambdaCode.zip')
})
