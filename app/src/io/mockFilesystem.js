module.exports = (state) => ({
    getDirectories: (source) => {
        if (!source) {
            throw new Error('getDirections requires a path')
        }
        const path = source.split('/').filter((x) => x.length > 0)
        let folder = state
        path.forEach((key) => {
            folder = folder[key]
        })

        return Object.keys(folder)
    },

    makeDir: async (path) => {
        const pathKeys = path.split('/').filter((x) => x.length > 0)

        let position = state
        pathKeys.forEach((key) => {
            if (!position[key]) {
                position[key] = {}
            }
            position = position[key]
        })
    },

    removeDir: (path) => {
        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let position = state
        const lastIndex = pathKeys.length - 1
        pathKeys.forEach((key, i) => {
            if (!position[key]) {
                position[key] = {}
            }

            if (lastIndex === i) {
                delete position[key]
            } else {
                position = position[key]
            }
        })
    },

    copyDir: (input) => {
        const pathKeys = input.source.split('/').filter((x) => x.length > 0)
        let folder = state
        pathKeys.forEach((key) => {
            folder = folder[key]
        })

        const stateToCopy = JSON.stringify(folder)

        const targetKeys = input.target.split('/').filter((x) => x.length > 0)
        let targetPosition = state
        const lastTargetIndex = targetKeys.length - 1
        targetKeys.forEach((key, i) => {
            if (!targetPosition[key]) {
                targetPosition[key] = {}
            }

            if (lastTargetIndex === i) {
                targetPosition[key] = JSON.parse(stateToCopy)
            } else {
                targetPosition = targetPosition[key]
            }
        })
    },

    getFile: (path) => {
        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let folder = state
        pathKeys.forEach((key) => {
            folder = folder[key]
        })

        return folder
    },

    getJsFile: async (path) => {
        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let folder = state
        pathKeys.forEach((key) => {
            folder = folder[key]
        })

        let module = null
        const code = folder.replace('export default ', 'module = ')
        eval(code)
        return module
    },

    writeFile: async (input) => {
        const path = input.path
        const content = input.content

        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let targetPosition = state
        const lastTargetIndex = pathKeys.length - 1
        pathKeys.forEach((key, i) => {
            if (!targetPosition[key]) {
                targetPosition[key] = {}
            }

            if (lastTargetIndex === i) {
                targetPosition[key] = content
            } else {
                targetPosition = targetPosition[key]
            }
        })
    },

    removeFile: (path) => {
        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let targetPosition = state
        const lastTargetIndex = pathKeys.length - 1
        pathKeys.forEach((key, i) => {
            if (!targetPosition[key]) {
                targetPosition[key] = {}
            }

            if (lastTargetIndex === i) {
                delete targetPosition[key]
            } else {
                targetPosition = targetPosition[key]
            }
        })
    },

    copyFile: (input) => {
        const pathKeys = input.source.split('/').filter((x) => x.length > 0)
        let folder = state
        pathKeys.forEach((key) => {
            folder = folder[key]
        })

        const stateToCopy = JSON.stringify(folder)

        const targetKeys = input.target.split('/').filter((x) => x.length > 0)
        let targetPosition = state
        const lastTargetIndex = targetKeys.length - 1
        targetKeys.forEach((key, i) => {
            if (!targetPosition[key]) {
                targetPosition[key] = {}
            }

            if (lastTargetIndex === i) {
                targetPosition[key] = JSON.parse(stateToCopy)
            } else {
                targetPosition = targetPosition[key]
            }
        })
    },

    zipFolder: async (input) => {
        const path = input.target + '/' + input.name + '.zip'
        const content = 'ZIP_FILE'

        const pathKeys = path.split('/').filter((x) => x.length > 0)
        let targetPosition = state
        const lastTargetIndex = pathKeys.length - 1
        pathKeys.forEach((key, i) => {
            if (!targetPosition[key]) {
                targetPosition[key] = {}
            }

            if (lastTargetIndex === i) {
                targetPosition[key] = content
            } else {
                targetPosition = targetPosition[key]
            }
        })
    }
})
