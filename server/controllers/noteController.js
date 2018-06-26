const _ = require('lodash');
const NotesDB = require('../models/noteModel');

// Get all notes details
const getNotes = (req, res, next) => {
    let filterParams = req.query.filter || "0";
    let sortParams = req.query.sort || "1";
    let filtering = {};

    if (filterParams === "0") {
        filtering = {finished: false};
    }
    let sorting;
    let sortingArr = [{"date": 1}, {"createdAt": -1}, {"rate": -1}];

    switch (sortParams) {
        case "1":
            sorting = sortingArr[0];
            break;
        case "2":
            sorting = sortingArr[1];
            break;
        case "3":
            sorting = sortingArr[2];
            break;
        default:
    }

    NotesDB.find(
        filtering, {
            updatedAt: 0,
            createdAt: 0
        }).sort(sorting
    ).exec((err, notes) => {
        res.status(200).json(notes);
    });
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
