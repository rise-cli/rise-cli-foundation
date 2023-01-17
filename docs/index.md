# RISE CLI Foundation

The aim of this project is to give you everything you need to make a CLI by providing:

-   terminal utils to print to the terminal
-   terminal utils to take input from a user executing a cli
-   filesystem utils to do CRUDL operations on files and folders
-   filesystem utils to zip files and folders

## How to install

```js
npm i rise-cli-foundation
```

## Usage

### Setup CLI Program

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

## FileSystem Usage

### filesystem.getDirectories

```js
import { filesystem } from 'rise-cli-foundation'
const x = filesystem.getDirectories({
    path: '/',
    projectRoot: __dirname
})
```

### filesystem.makeDir

```js
import { filesystem } from 'rise-cli-foundation'
await filesystem.makeDir({
    path: '/example',
    projectRoot: __dirname
})
```

### filesystem.removeDir

```js
import { filesystem } from 'rise-cli-foundation'
filesystem.removeDir({
    path: '/example',
    projectRoot: __dirname
})
```

### filesystem.copyDir

```js
import { filesystem } from 'rise-cli-foundation'
filesystem.copyDir({
    source: '/source',
    target: '/target',
    projectRoot: __dirname
})
```

### filesystem.getFile

```js
import { filesystem } from 'rise-cli-foundation'
const x = await filesystem.getFile({
    path: '/target/fileA.txt',
    projectRoot: __dirname
})
```

### filesystem.getJsFile

```js
import { filesystem } from 'rise-cli-foundation'
const x = await filesystem.getJsFile({
    path: '/target/app.js',
    projectRoot: __dirname
})
```

### filesystem.writeFile

```js
import { filesystem } from 'rise-cli-foundation'
filesystem.writeFile({
    path: '/fileA.js',
    content: 'export default {name: "app"}',
    projectRoot: __dirname
})
```

### filesystem.removeFile

```js
import { filesystem } from 'rise-cli-foundation'
filesystem.removeFile({
    path: '/fileA.js',
    projectRoot: __dirname
})
```

### filesystem.copyFile

```js
import { filesystem } from 'rise-cli-foundation'
filesystem.copyFile({
    source: '/source/fileA.js',
    target: '/target/fileA.js',
    projectRoot: __dirname
})
```

### filesystem.zipFolder

```js
import { filesystem } from 'rise-cli-foundation'
await filesystem.zipFolder({
    source: '/source',
    target: '/target',
    name: 'lambdaCode',
    projectRoot: __dirname
})
```

### filesystem.getTextContent

```js
import { filesystem } from 'rise-cli-foundation'
const text = await filesystem.getTextContent({
    path: '/text.txt',
    projectRoot: __dirname
})
```
