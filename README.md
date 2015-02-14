# vflow (PouchDB)

vflow is part of the palmetto concept, the vflow module is an abstraction around pouchDB's changes feed and it creates a simple api for interacting with the write stream system.  It basically breaks it down into an event emitter.

## usage

```
var flow = require('vflow-pouchdb')('flowdb');
flow.on('<type>:<verb>', ...);
flow.emit('<type>:<verb>', o);
```

## install

```
npm install vflow-pouchdb
```

This is module is primarily used in vbridge applications using the palmetto architecture concept, leveraging one write location and components and services.


