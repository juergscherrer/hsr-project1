const _ = require('lodash');
const NotesDB = require('../models/noteModel');

// Get all notes details
const getNotes = (req, res, next) => {
    let filterParams = req.query.filter || "0";
    let sortParams = req.query.sort || "1";
    let filtering = false;

    if (filterParams === "0") {
        filtering = true
    }

    switch (sortParams) {
        case "1":
            if (filtering) {
                NotesDB.find({
                    finished: false
                }, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                        date: 1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            } else {
                NotesDB.find({}, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                        date: 1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            }
            break;
        case "2":
            if (filtering) {
                NotesDB.find({
                    finished: false
                }, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                    createdAt: -1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            } else {
                NotesDB.find({}, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                    createdAt: -1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            }
            break;
        case "3":
            if (filtering) {
                NotesDB.find({
                    finished: false
                }, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                    rate: -1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            } else {
                NotesDB.find({}, {
                    updatedAt: 0,
                    createdAt: 0
                }).sort({
                    rate: -1,
                    }
                ).exec((err, notes) => {
                    res.status(200).json(notes);
                });
            }
            break;
        default:

    }


};

// Get a single note details
const getNote = (req, res, next) => {
    NotesDB.find({
        _id: req.params.noteId
    }, {
        updatedAt: 0,
        createdAt: 0
    }, (err, note) => {
        res.status(200).json(note);
    });
};

// Create a new note
const createNote = (req, res, next) => {
    let note = {
        title,
        description,
        date,
        rate,
        finished,
    } = req.body;

    NotesDB.insert(note, (err, newNote) => {
        let result = _.omit(newNote, ['updatedAt', 'createdAt']);
        res.status(200).json(result);
    });
};

// Update note's details.
const updateNote = (req, res, next) => {
    let id = req.params.noteId;
    let note = {
        title,
        description,
        date,
        rate,
        finished,
    } = req.body;

    NotesDB.update({
        _id: id
    }, {
        $set: note
    }, (err, newNote) => {
        res.status(200).json({
            success: true
        });
    });
};

module.exports = {
    getNotes,
    createNote,
    getNote,
    updateNote,
};
