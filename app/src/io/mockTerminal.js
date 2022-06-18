let app = {}
let defaultFlags = {}
const input = {
    makeCommand: (config) => {
        const flags = config.flags || []
        const defaultFlagObj = flags.reduce((acc, x) => {
            acc[x.flag.slice(2)] = x.default
            return acc
        }, {})

        defaultFlags[config.command] = defaultFlagObj
        app[config.command] = config.action
    },

    execute: (terminalCommand) => {
        const command = terminalCommand.split(' ')[0]
        const terminalCommandFlags = terminalCommand
            .split(' ')
            .filter((_, i) => i > 0)
            .join(' ')

        const flagArray = terminalCommandFlags
            .replace(/\s/g, '=')
            .split('=')
            .filter((x) => x.length > 0)

        let currentKey = ''
        let flagObject = { ...defaultFlags[command] }
        flagArray.forEach((x) => {
            if (x.startsWith('--')) {
                const key = x.split('--')[1]
                currentKey = key
                flagObject[key] = ''
            } else {
                flagObject[currentKey] = x
            }
        })

        app[command](flagObject)
    }
}

export default (state) => ({
    ...input,
    printInfoMessage: (m) => {
        state.push(m)
    },

    printSuccessMessage: (m) => {
        state.push(m)
    },

    printErrorMessage: (m) => {
        state.push(m)
    },

    clear: () => {
        for (let index = 0; index < state.length; index++) {
            state.pop()
        }
    }
})
