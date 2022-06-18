#! /usr/bin/env node
import app from './realApp.js'
const projectRoot = process.cwd()
const start = app(projectRoot)
start()
