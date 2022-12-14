#!/usr/bin/env zx
import 'zx/globals'
import { $ } from 'zx'

// copy all src/assets to dist/assets
await $`cp -r -Force src/assets/ dist`