const file_system = require('fs')
const archiver = require('archiver')
const COMPRESSION_LEVEL = 9

exports.zipFolder = function ({ source, target, name }) {
    if (!file_system.existsSync(target)) {
        file_system.mkdirSync(target)
    }

    if (target[target.length - 1] !== '/') {
        target = target + '/'
    }

    const archive = archiver('zip', { zlib: { level: COMPRESSION_LEVEL } })
    const stream = file_system.createWriteStream(target + name + '.zip')

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', (err) => reject(err))
            .pipe(stream)

        stream.on('close', () => resolve())
        archive.finalize()
    })
}
