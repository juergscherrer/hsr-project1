const Datastore = require('nedb');
const notes = new Datastore({
    filename: './database/notes.db',
    autoload: true,
    timestampData: true
});

module.exports = notes;