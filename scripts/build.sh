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

# Cheap way to get some progress feedback
set -x

# Build for older nodejs (>=v14)
# tsc -p ./tsconfig.node-lts-old.json

# Build for modern nodejs (>=v18)
# tsc -p ./tsconfig.node-lts.json

# Build for browser tools using CommonJs
tsc -p ./tsconfig.browser-cjs.json

# Build for browser tools using standard ECMScript modules
tsc -p ./tsconfig.browser-esm.json




