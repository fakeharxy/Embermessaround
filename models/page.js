var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PageSchema  = new Schema({
  name: String,
  body: String
});

module.exports = mongoose.model('Page', PageSchema);
