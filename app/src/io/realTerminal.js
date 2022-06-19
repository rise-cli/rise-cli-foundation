const { program } = require('commander')
const input = {
    makeCommand: (config) => {
        if (!config.command) {
            throw new Error('makeCommand must include a "command"')
        }

        if (!config.action || typeof config.action !== 'function') {
            throw new Error('makeCommand must include a "action"')
        }

        const cm = program
            .command(config.command)
            .description(config.description || '')
            .action((options) => config.action(options))

        if (config.flags) {
            config.flags.forEach((option) => {
                cm.option(
                    option.flag + ' <value>',
                    option.description || '',
                    option.default
                )
            })
        }
    },

    start: () => program.parse()
}

const output = {
    printInfoMessage: (m) => {
        console.log('\x1b[37m', m)
    },

    printSuccessMessage: (m) => {
        console.log('\x1b[32m', m)
    },

    printErrorMessage: (m) => {
        console.log('\x1b[31m', m)
    },

    clear: () => {
        console.clear()
    }
}

module.exports = {
    ...input,
    ...output
}
