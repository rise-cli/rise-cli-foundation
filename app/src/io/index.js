import realTerminal from './realTerminal.js'
import realFilesystem from './realFilesystem.js'
import mockTerminal from './mockTerminal.js'
import mockFilesystem from './mockFilesystem.js'

export default (config) => {
    if (config.type === 'real') {
        return {
            terminal: realTerminal,
            filesystem: realFilesystem(config.projectRoot)
        }
    }

    if (config.type === 'mock') {
        if (!config.terminalState || !Array.isArray(config.terminalState)) {
            throw new Error('Mock io must include "terminalState"')
        }

        if (
            !config.filesystemState ||
            typeof config.filesystemState !== 'object'
        ) {
            throw new Error('Mock io must include "filesystemState"')
        }

        return {
            terminal: mockTerminal(config.terminalState),
            filesystem: mockFilesystem(config.filesystemState)
        }
    }
}
