WasmFiddle
====
This repository contains the WasmFiddle website source code.

Deprecation notice
====
The project scope was extended. We created a new repository at https://github.com/wasdk/WebAssemblyStudio -- the development will be continued there.

Running your own local copy of the website
===

To run a local copy, you will need to install node.js and webpack on your computer, then run the following commands:

```
npm install
npm install --only=dev
```

To build WasmFiddle whenever a file changes run:

```
npm run build-watch
```

To start a dev web server run:

```
npm run dev-server
```
