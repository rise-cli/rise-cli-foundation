const fsextra = require('fs-extra')
const { zipFolder } = require('./realZip.js')

module.exports = (projectRoot) => ({
    /**
     * Folders
     */
    getDirectories: (source) => {
        if (!source) {
            throw new Error('getDirections requires a path')
        }
        const path = projectRoot + source
        return fsextra
            .readdirSync(path, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
    },

    makeDir: async (path) => {
        try {
            await fsextra.mkdir(projectRoot + path)
        } catch (e) {
            if (e.message.startsWith('EEXIST: file already exists')) {
                return
            }
            throw new Error(e)
        }
    },

    removeDir: async (path) => {
        fsextra.removeSync(projectRoot + path)
    },

    copyDir: (input) => {
        fsextra.copySync(projectRoot + input.source, projectRoot + input.target)
    },

    zipFolder: async ({ source, target, name }) => {
        return await zipFolder({
            source: projectRoot + source,
            target: projectRoot + target,
            name
        })
    },

    /**
     * Files
     */
    getFile: async (path) => {
        return await fsextra.readFile(projectRoot + path)
    },

    getJsFile: async (path) => {
        return require(projectRoot + path)
    },

    writeFile: (props) => {
        fsextra.writeFileSync(projectRoot + props.path, props.content)
    },

    removeFile: (path) => {
        fsextra.removeSync(projectRoot + path)
    },

    copyFile: (input) => {
        fsextra.copyFileSync(
            projectRoot + input.source,
            projectRoot + input.target
        )
    }
})
