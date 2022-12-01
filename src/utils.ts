

export function withAdditionalPathSegments(url: string | URL, segments: string[]): URL {
    let extended = new URL(url);
    extended.pathname =
        // make sure not not have a //
        [trimEndSlash(extended.pathname)]
            // encode and add all segment
            .concat(segments.map((segment) => encodeURIComponent(segment)))
            .join('/');
    return extended;
}

function trimEndSlash(path: string): string {
    return path.endsWith('/') ? path.substring(0, path.length - 1) : path;
}
