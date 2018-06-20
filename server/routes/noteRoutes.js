const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.route('/')
    .get(noteController.getNotes)
    .post(noteController.createNote);

router.route('/:noteId')
    .get(noteController.getNote)
    .put(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;