export async function deploy(cli) {
    const wait = () => new Promise((r) => setTimeout(r, 1000))

    const times = [1, 2, 3, 4, 5]

    for (const t of times) {
        cli.terminal.clear()
        cli.terminal.printInfoMessage('Deploying...' + t)
        await wait()
    }
    cli.terminal.clear()
    cli.terminal.printSuccessMessage('Done!')
}
