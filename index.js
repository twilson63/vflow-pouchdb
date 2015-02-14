var EventEmitter = require('events').EventEmitter, ee;
ee = module.exports = (ee = global.ee) != null ? ee : new EventEmitter();

var pouchdb = require('pouchdb');
var stream = pouchdb(process.env.Vflow || 'vflow');

stream.changes({
  include_docs: true,
  since: 'now',
  live: true
}).on('change', function(change) {
  var key = [change.doc.object.type, change.doc.verb].join(':'); 
  ee.emit(key, change.doc);
});

// always create new event on stream
ee.on('post', function(p) {
  //console.log(p);
  stream.post(p);
});
