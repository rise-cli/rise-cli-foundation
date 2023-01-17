import { program } from 'commander'
import process from 'node:process'

/** @typedef {import('./types.d').Flag} Flag */
/** @typedef {import('./types.d').CommandConfig} CommandConfig */

/**
 * @param {CommandConfig} config
 */
export function addCommand(config) {
    const cm = program
        .command(config.command)
        .description(config.description || '')
        .action((flags) => config.action(flags))

    config.flags.forEach((flag) => {
        cm.option(flag.flag + ' <value>', flag.description || '', flag.default)
    })
}

export function runProgram() {
    program.parse()
}

/**
 * In order to understand the console.log functions in this
 * file, it is recommended to read thru this article:
 * https://notes.burke.libbey.me/ansi-escape-codes/
 *
 * This article explains ANSI codes, and what all the weird strings
 * are in this file.
 */

const ANSI_PREFIX = '\x1b[' // also known as a CSI, or Control Sequence Introducer

const HIDE_CURSOR = ANSI_PREFIX + '?25l'
const SHOW_CURSOR = ANSI_PREFIX + '?25h'
const MOVE_CURSOR_TO_NEXT_LINE = ANSI_PREFIX + '1G'
const GREEN_TEXT = ANSI_PREFIX + '32m'
const BLUE_TEXT = ANSI_PREFIX + '34m'
const AQUA_TEXT = ANSI_PREFIX + '36m'
const WHITE_TEXT = ANSI_PREFIX + '37m'
const RED_TEXT = ANSI_PREFIX + '31m'
const DIM_TEXT = ANSI_PREFIX + '2m'
const BRIGHT_TEXT = ANSI_PREFIX + '0m'

/**
 * @param {string} text
 */
export function print(text) {
    console.log(text)
}

/**
 * @param {string} text
 * @returns {string}
 */
export function makeGreenText(text) {
    return `${GREEN_TEXT}${text}${WHITE_TEXT}`
}

/**
 * @param {string} text
 * @returns {string}
 */
export function makeBlueText(text) {
    return `${BLUE_TEXT}${text}${WHITE_TEXT}`
}

/**
 * @param {string} text
 * @returns {string}
 */
export function makeRedText(text) {
    return `${RED_TEXT}${text}${WHITE_TEXT}`
}

/**
 * @param {string} text
 * @returns {string}
 */
export function makeDimText(text) {
    return `${DIM_TEXT}${text}${BRIGHT_TEXT}`
}

/**
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export function setTextWidth(text, length) {
    return text.padEnd(length, ' ')
}

/**
 * @param {string} text
 */
export function printInfoMessage(text) {
    print(text)
}

/**
 * @param {string} text
 */
export function printSuccessMessage(text) {
    print(makeGreenText(text))
}

/**
 * @param {string} text
 */
export function printErrorMessage(text) {
    print(makeRedText(text))
}

export function clear() {
    console.clear()
}

export function hideCursor() {
    print(HIDE_CURSOR)
}

export function showCursor() {
    print(SHOW_CURSOR)
}

let loadingInterval
export function startLoadingMessage(text) {
    if (!process.stdout.isTTY) {
        console.log(text)
        return
    }

    const std = process.stdout
    const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    const spinnerFrames = dots
    let index = 0

    const log = () => {
        let line = spinnerFrames[index]
        if (!line) {
            index = 0
            line = spinnerFrames[index]
        }

        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        std.write(AQUA_TEXT + line + WHITE_TEXT + ' ' + text)

        index = index >= spinnerFrames.length ? 0 : index + 1
    }

    clearInterval(loadingInterval)
    log()
    loadingInterval = setInterval(log, 100)
}

export function endLoadingMessage() {
    clearInterval(loadingInterval)
}
