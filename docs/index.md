# RISE CLI Foundation

## How to install

```js
npm i rise-cli-foundation
```

## Usage

```js
#! /usr/bin/env node
import { terminal } from 'rise-cli-foundation'
const flags = [
    {
        flag: '--stage',
        default: 'dev'
    }
]

terminal.addCommand({
    command: 'deploy',
    flags,
    action: async (flags) => {
        const stage = flags.stage
        terminal.printInfoMessage('stage: ' + stage)
    }
})

terminal.runProgram()
```

### Logging

```js
import { terminal } from 'rise-cli-foundation'

let text = terminal.makeGreenText('text')
let text = terminal.makeBlueText('text')
let text = terminal.makeRedText('text')
let text = terminal.makeDimText('text')
let text = terminal.setTextWidth('text', 20)
terminal.print(text)

terminal.clear()
terminal.hideCursor()
terminal.showCursor()

terminal.printErrorMessage('A Error Message')
terminal.printInfoMessage('A Info Message')
terminal.printSuccessMessage('A Success Message')

terminal.startLoadingMessage('Something is happening')
terminal.endLoadingMessage()
```
