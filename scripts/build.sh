#!/usr/bin/env bash
set -euo pipefail

# Make sure we reliably are in the project root no matter
# how and from where the script was called.
if [[ "$0" == /* ]]; then
    ROOT="$(dirname "$0")/.."
else
    ROOT="$(pwd)/$(dirname "$0")/.."
fi
cd "$ROOT" || exit 1

OUT="$ROOT/dist"

# Make sure OUT is clean instead of just adding/overwriting
[ -d "$OUT" ] && rm -r "$OUT"

# Build ECMAScript module
#TODO: Remove once the other variants are added
tsc -p ./tsconfig.json

# Build for older nodejs
#tsc -p ./tsconfig-nodejs-commonjs.json

# Build for modern nodejs
#tsc -p ./tsconfig-nodejs-esm.json

# Build for older browser toolchain
#tsc -p ./tsconfig-browser-commonjs.json

# Build for modern browser toolchain
#tsc -p ./tsconfig-browser-esm.json




