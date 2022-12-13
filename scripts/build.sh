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

# Run tsc by hand to emit types
tsc -p ./tsconfig.json

# Build unbundled ESM modules for usage in projects which use a bundler
BABEL_ENV=esm babel --extensions '.ts' --out-dir 'dist/esm' src/ #--source-maps

# Build unbundled CJS modules for usage in projects which use a bundler
BABEL_ENV=cjs babel --extensions '.ts' --out-dir 'dist/cjs' src/ #--source-maps

# Use rollup.js to:
# - generate a bundled (and minified) ESM module for ad-hoc in browser use
# - generate a bundled (and minified) UMD module for ad-hoc usage in old browsers
BABEL_ENV=bundled rollup -c
