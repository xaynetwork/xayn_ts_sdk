# Xayn SDK
## TypeScript version
___
## Overview

This SDK is divided into 2 parts, client and server.\
The client version is generally used for front end applications, whereas the server part is rather meant for back end solutions.

___
## Server
To create the server-side SDK version, simply use

```typescript
const server = new Server({
  endpoint: {your_endpoint},
  environment: {your_environment}, // eg default
  token: {your_token},
});
```
### Uploading documents
The ingest method accepts a batch of documents:
```typescript
let result = await server.ingest({
    documents: [
    new IngestedDocument(
        "document_id_a",
        "The quick brown fox jumped over the lazy dog",
        {
            category: "fonts",
            link: "https://www.fonts.com",
            image: "https://www.fonts.com/hello.png",
        }
    ),
    new IngestedDocument(
        "document_id_b",
        "Arsenal beat Liverpool yesterday",
        {
            category: "sports",
            link: "https://www.sports.com",
            image: "https://www.sports.com/match.png",
        }
    ),
    ],
}); /// returns true if successful
```
### Update a document's properties
This example updates the properties for ```document_id_a``` and overwrites the image.
```typescript
let result = await server.updateProperties({
    documentId: "document_id_a",
    properties: {
        category: "fonts",
        link: "https://www.fonts.com",
        image: "https://www.fonts.com/hello_again.png",
    },
});
```
### Fetch a document's properties
```typescript
let result = await server.getProperties({
    documentId: "document_id_a",
});

expect(result["properties"]["category"]).to.equal("fonts");
```
### Delete a document's properties
```typescript
await server.deleteProperties({
    documentId: "document_id_a",
});
```
### Delete a single document
```typescript
await server.delete({
    documentId: "document_id_a",
});
```
### Delete multiple documents
```typescript
let result = await server.deleteAll({
    documents: ["document_id_a", "document_id_b"],
});
```
___
## Client
To create the client-side SDK version, simply use

```typescript
const server = new Client({
  endpoint: {your_endpoint},
  environment: {your_environment}, // eg default
  token: {your_token},
  userId: {any_user}, // eg John_Doe
});
```
### Like a single document
```typescript
await client.likeDocument({ documentId: "test_d" }); // returns true if successful
```
### Fetch personalized documents
```typescript
const result = await client.personalizedDocuments({});
```