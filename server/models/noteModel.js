const Datastore = require('nedb');
const notes = new Datastore({
    filename: './server/database/notes.db',
    autoload: true,
    timestampData: true
});

module.exports = notes;