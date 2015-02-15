var EventEmitter = require('events').EventEmitter, ee;
ee = module.exports = (ee = global.ee) != null ? ee : new EventEmitter();

var pouchdb = require('pouchdb');
var stream = pouchdb(process.env.Vflow || 'vflow');
var uuid = require('node-uuid');
var systemId = uuid.v4();

stream.changes({
  include_docs: true,
  since: 'now',
  live: true
}).on('change', function(change) {
  if (!change.doc.object) return; 
  if (!change.doc.object.type) return;
  var key = [change.doc.object.type, change.doc.verb].join(':'); 
  
  //console.log(key);
  if (['profile:create','profile:update','profile:remove'].indexOf(key) > -1) {
    return ee.emit(key, change.doc);
  }

  if (change.doc.systemId
    && change.doc.systemId === systemId) {
    ee.emit(key, change.doc);
  }
});

// always create new event on stream
ee.on('post', function(p) {
  p.systemId = systemId;

  stream.post(p);
});
