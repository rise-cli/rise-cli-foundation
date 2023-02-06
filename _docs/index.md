# Rise CLI Foundation

## Install

```
npm i rise-cli-foundation
```

### Example CLI Program

```js
#! /usr/bin/env node
import * as cli from 'rise-cli-foundation'
const flags = [
    {
        flag: '--stage',
        default: 'dev'
    }
]

cli.addCommand({
    command: 'deploy',
    flags,
    action: async (flags) => {
        const stage = flags.stage
        terminal.printInfoMessage('stage: ' + stage)
    }
})

cli.runProgram()
```

### Logging

```js
import * as cli from 'rise-cli-foundation'

let text = cli.makeGreenText('text')
let text = cli.makeBlueText('text')
let text = cli.makeRedText('text')
let text = cli.makeDimText('text')
let text = cli.setTextWidth('text', 20)
cli.print(text)

cli.clear()
cli.hideCursor()
cli.showCursor()

cli.printErrorMessage('A Error Message')
cli.printInfoMessage('A Info Message')
cli.printSuccessMessage('A Success Message')

cli.startLoadingMessage('Something is happening')
cli.endLoadingMessage()
```
