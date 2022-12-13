# Xayn SDK -- TypeScript version

## Early Version Warning

This library will change, through it overall functionality
and how it can be used will stay roughly the same. Mainly:

- `Client` and `Server` here refer to a sdk each. `Client` is used by publishers
  clients (and there server in case of server side rendering). `Server` is used
  by publishers server. This will be renamed soon candidates are `PersonalizationApi`
  and `ManagementApi`, through it's not fixed.

- The implementation has a lot of potential for improvement in the future it will
  like be auto generated from our internal API specification.


## Npm

Pre-build JS with TypeScript annotation files is published to [NPM](https://www.npmjs.com/package/xayn_ts_sdk)

## Platform Support

Depending of how/what is imported the requirements differ:

- default unbundled ESM module (`dist/esm/index.js`)
    - is meant to be used by modern tooling which will bundle it's dependencies, both for browser and nodejs
    - as such no transpilation for supporting older targets is done

- default unbundled CommonJS module (`dist/cjs/index.js`)
    - this is meant for older tooling and older versions of nodejs
    - targets ES2015 + WHATWG fetch
    - **if `fetch` is not available (e.g. Node Version < 18) a polyfill needs to be imported before using this library**

- bundled ESM/UMD modules (`dist/bundled/index{.esm,.umd}{.min,}.js`)
    - this is meant for situations where the library can not be bundled into the application which is using it.
    - targets browserslist `> 0.25%, not dead` but at least ES2015
    - at point of writing this corresponds to

      ```json
      {
        "android": "4.4.3",
        "chrome": "103",
        "edge": "107",
        "firefox": "106",
        "ios": "12.2",
        "opera": "91",
        "safari": "13.1",
        "samsung": "18"
      }
      ```
    - this will change with new releases and older browsers falling below
      0.25% market share

___

## Overview

This SDK is divided into 2 parts, client and server.\
The client version is generally used for front end applications, whereas the server part is rather meant for back end solutions.

___

## Server
The ```client``` part of our SDK is typically used within back end projects.\
It is ideally liked to update or cron jobs so that new documents are ingested on regular intervals.\
It also allow for modifying document properties, for example if an article would receive an updated accompanying image.

To create the server-side SDK version, simply use

```typescript
const sdk = new Server({
  endpoint: {your_endpoint_url}, //e.g. https://some.domain.invalid/default
  token: {your_token},
});
```

### Uploading documents
Send at least one document to our recommendation service.\
A document has 2 required properties, document_id and snippet.\
Optionally you can also submit a json object of properties to accompany the document.
\
<ul>
    <li>
        <p>required <b>id</b></p>
        <p><i>A unique document identifier</i></p>
    </li>
    <li>
        <p>required <b>snippet</b></p>
        <p><i>A concise paragraph which clearly describes what the document is about.</i></p>
    </li>
    <li>
        <p>optional <b>properties</b></p>
        <p><i>A json object mapping strings to arbitrary JSON values, usually this holds relevant data to display this document to the user, for example: title, link, image, ...</i></p>
    </li>
</ul>

```typescript
await sdk.ingest({
    documents: [
        {
            id: "document_id_a",
            snippet: "The quick brown fox jumped over the lazy dog",
            properties: {
                category: "fonts",
                link: "https://www.fonts.com",
                image: "https://www.fonts.com/hello.png",
            }
        },
        {
            id: "document_id_b",
            snippet: "Arsenal beat Liverpool yesterday",
            properties: {
                category: "sports",
                link: "https://www.sports.com",
                image: "https://www.sports.com/match.png",
            }
        },
    ],
});
```

### Update a document's properties

This example updates the properties for ```document_id_a``` and overwrites the image.

```typescript
await sdk.updateProperties({
    documentId: "document_id_a",
    properties: {
        category: "fonts",
        link: "https://www.fonts.com",
        image: "https://www.fonts.com/hello_again.png",
    },
});
```

### Fetch a document's properties

Allows to peek at the current values of properties for a given document.

```typescript
const result = await sdk.getProperties({
    documentId: "document_id_a",
});

expect(result["category"]).to.equal("fonts");
```

### Delete a document's properties

Simply deletes any attaches properties on a given document.

```typescript
await sdk.deleteProperties({
    documentId: "document_id_a",
});
```

### Delete a single document

Deletes the document from our system.

```typescript
await sdk.delete({
    documentId: "document_id_a",
});
```

### Delete multiple documents

Deletes a batch of documents from our system.

```typescript
await sdk.deleteAll({
    documents: ["document_id_a", "document_id_b"],
});
```

___

## Client

The ```client``` part of our SDK is typically used within front end projects.\
Here, we also require a unique user via user_id.\

To create the client-side SDK version, simply use

```typescript
const sdk = new Client({
  endpoint: {your_endpoint},
  token: {your_token},
  userId: {any_user}, // eg "35940aa3-95ad-4dc2-9a2b-000eed135e9b"
});
```

### Like a single document

Marks the given document as "liked" for this user.

```typescript
await sdk.likeDocument({ documentId: "test_d" });
```

### Fetch personalized documents

Fetches personalized documents for this user.\
The default size is 10, but you can also pass a custom ```count``` value to override.\

```typescript
const result = await sdk.personalizedDocuments({});
```

License
--------

Licensed under

- Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
