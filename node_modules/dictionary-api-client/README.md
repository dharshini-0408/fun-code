![banner](https://github.com/user-attachments/assets/9499749f-27ce-4421-a2de-8954d248fa15)
![npm](https://img.shields.io/npm/v/dictionary-api-client)
![downloads](https://img.shields.io/npm/dw/dictionary-api-client)
![license](https://img.shields.io/npm/l/dictionary-api-client)
![Security Policy](https://img.shields.io/badge/security-policy-brightgreen)
![npm_provenance](https://img.shields.io/badge/npm-provenance-brightgreen?logo=npm)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/dictionary-api-client)
# Dictionary API Client
A minimal, fetch-based JavaScript & TypeScript client for the free [Dictionary API](https://dictionaryapi.dev/) that uses native fetch, works in Node.js (18+) and modern browsers and supports javascript and typescript.

### 📦 Installation
```console
npm install dictionary-api-client
```
Note: If you are using Node.js, ensure your project supports ES modules.

### 📘 Features
1. Lookup word definitions using a public dictionary API
2. Automatically encodes words with spaces or special characters
3. Clean success / failure response contract

### 🔤 Example Usage
```javascript
import { getDefinitionFor } from "dictionary-api-client";
const res = await getDefinitionFor({ word: "white" });
console.log(res);
```
1. Success Response Schema
```javascript
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": [
    {
      "word": "white",
      "phonetic": "/waɪt/",
      "phonetics": [
        {
          "text": "/waɪt/",
          "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/white-uk.mp3"
        }
      ],
      "meanings": [
        {
          "partOfSpeech": "noun",
          "definitions": [
            {
              "definition": "The color of snow or milk; light containing all visible wavelengths."
            }
          ]
        },
        {
          "partOfSpeech": "adjective",
          "definitions": [
            {
              "definition": "Bright and colourless; reflecting equal quantities of visible light.",
              "example": "Write in black ink on white paper."
            }
          ]
        }
      ]
    }
  ]
}
```

2. Error Response Schema
```javascript
{
  "code":"api-fail",
  "message":"Not Found",
  "payload": {
    "title":"No Definitions Found",
    "message":"Sorry pal, we couldn't find definitions for the word you were looking for.",
    "resolution":"You can try the search again at later time or head to the web instead."
  }
}
```

### 📗 Test Coverage

```
PASS src/get-definition-for/test/index.test.ts
  getDefinitionFor
    ✓ throws when global fetch is unavailable
    ✓ returns api-ok and payload when response ok
    ✓ returns api-fail when response.ok is false
    ✓ returns api-fail when fetch throws
    ✓ targets the dictionary api root url

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
```

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.ts |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

### 📘 Contributing
Contributions, suggestions, and improvements are welcome.
Feel free to open issues or pull requests.

### 🔒 Security & Privacy
1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the [Security Policy](https://github.com/NPM-Workbench/dictionary-api-client/security/policy).

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
