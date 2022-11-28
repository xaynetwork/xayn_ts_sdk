# Xayn SDK
## TypeScript version
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
  endpoint: {your_endpoint},
  environment: {your_environment}, // eg default
  token: {your_token},
});
```
### Uploading documents
Send at least one document to our recommendation service.\
A document has 2 required properties, document_id and snippet.\
Optionally you can also submit a free map of properties to accompany the document.
\
<ul>
    <li>
        <p>required <b>document_id</b></p>
        <p><i>A unique identifier</i></p>
    </li>
    <li>
        <p>required <b>snippet</b></p>
        <p><i>A concise paragraph which clearly describes what the document is about.</i></p>
    </li>
    <li>
        <p>optional <b>properties</b></p>
        <p><i>A key-value object, usually this holds relevant data to display this document to the user, for example: title, link, image, ...</i></p>
    </li>
</ul>

```typescript
const result = await sdk.ingest({
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
const result = await sdk.updateProperties({
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

expect(result["properties"]["category"]).to.equal("fonts");
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
const result = await sdk.deleteAll({
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
  environment: {your_environment}, // eg default
  token: {your_token},
  userId: {any_user}, // eg John_Doe
});
```
### Like a single document
Marks the given document as "liked" for this user.
```typescript
await sdk.likeDocument({ documentId: "test_d" }); // returns true if successful
```
### Fetch personalized documents
Fetches personalized documents for this user.\
The default size is 10, but you can also pass a custom ```count``` value to override.\

```typescript
const result = await sdk.personalizedDocuments({});
```