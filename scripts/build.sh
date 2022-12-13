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

# Build for CommonJs
#
# This should work both for node and browser but older
# node version (<18) need to polyfill fetch.
tsc -p ./tsconfig.cjs.json

# Build for ECMAScript Modules
#
# This should work both for node and browser but older
# node version (<18) need to polyfill fetch.
tsc -p ./tsconfig.esm.json

