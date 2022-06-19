const makeIO = require('../index.js')

test('realFilesystem can read, create, and delete directories', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'example-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'example-app'}"
            }
        }
    }

    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    const res = io.filesystem.getDirectories('/modules')
    expect(res).toEqual(['sectionA', 'sectionB'])

    await io.filesystem.makeDir('/example/example2')
    expect(filesystemState.example.example2).toEqual({})

    // creating again wont throw an error
    await io.filesystem.makeDir('/example')

    const res2 = io.filesystem.getDirectories('/')
    expect(res2).toEqual(['modules', 'example'])

    io.filesystem.removeDir('/example/example2')

    const res3 = io.filesystem.getDirectories('/example')
    expect(res3).toEqual([])
})

test('realFilesystem will throw error if no path is given', () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'example-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'example-app'}"
            }
        }
    }
    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    expect(() => {
        io.filesystem.getDirectories()
    }).toThrow('getDirections requires a path')
})

test('realFilesystem can copy a directory with files in it', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'example-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'example-app'}"
            }
        }
    }
    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    io.filesystem.copyDir({
        source: '/modules',
        target: '/targetModules'
    })

    const res = io.filesystem.getDirectories('/')
    expect(res).toEqual(['modules', 'targetModules'])

    const fileA = await io.filesystem.getFile(
        '/targetModules/sectionA/fileA.js'
    )
    expect(fileA).toBe("export default { name: 'example-app'}")

    const fileB = await io.filesystem.getFile(
        '/targetModules/sectionB/fileA.js'
    )
    expect(fileB).toBe("export default { name: 'example-app'}")
})

test('realFilesystem can get a js file', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'example-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'example-app'}"
            }
        }
    }
    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    const app = await io.filesystem.getJsFile('/modules/sectionA/fileA.js')

    expect(app.name).toBe('example-app')
})

test('realFilesystem can write a file', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'example-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'example-app'}"
            }
        }
    }

    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    io.filesystem.writeFile({
        path: '/fileA.js',
        content: 'export default {name: "made-app"}'
    })

    const app = await io.filesystem.getJsFile('/fileA.js')
    expect(app.name).toBe('made-app')
    io.filesystem.removeFile('/fileA.js')

    expect(filesystemState['fileA.js']).toBeFalsy()
})

test('realFilesystem can copy files', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'copy-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'copy-app'}"
            }
        }
    }

    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })

    io.filesystem.copyFile({
        source: '/modules/sectionA/fileA.js',
        target: '/target/fileA.js'
    })

    const app = await io.filesystem.getJsFile('/target/fileA.js')
    expect(app.name).toBe('copy-app')
    io.filesystem.removeFile('/target/fileA.js')
})

test('realFilesystem can make a zip a folder', async () => {
    const filesystemState = {
        modules: {
            sectionA: {
                'fileA.js': "export default { name: 'copy-app'}"
            },
            sectionB: {
                'fileA.js': "export default { name: 'copy-app'}"
            }
        },
        target: {}
    }

    const io = makeIO({
        type: 'mock',
        terminalState: [],
        filesystemState
    })
    await io.filesystem.zipFolder({
        source: '/modules',
        target: '/target',
        name: 'lambdaCode'
    })

    const x = await io.filesystem.getFile('/target/lambdaCode.zip')
    expect(x).toBeTruthy()
    io.filesystem.removeFile('/target/lambdaCode.zip')
})
