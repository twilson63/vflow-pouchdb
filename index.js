var EventEmitter = require('events').EventEmitter, ee;
ee = module.exports = (ee = global.ee) != null ? ee : new EventEmitter();

var pouchdb = require('pouchdb');
var stream = pouchdb(process.env.Vflow || 'vflow');
var username = null;

stream.changes({
  include_docs: true,
  since: 'now',
  live: true
}).on('change', function(change) {
  if (!change.doc.object) return; 
  if (!change.doc.object.type) return;
  var key = [change.doc.object.type, change.doc.verb].join(':'); 
  
  //console.log(key);
  if (key === 'user:create' 
    || key === 'session:create'
    || key === 'user:created'
    || key === 'session:isactive'
    || key === 'session:inactive') {
    return ee.emit(key, change.doc);
  }
  if (change.doc.actor && change.doc.actor.name === username) {
    ee.emit(key, change.doc);
  }
});

// always create new event on stream
ee.on('post', function(p) {
  //console.log(p);
  if (p.actor && p.actor.name) username = p.actor.name;

  stream.post(p);
});
