const initEditNote = function () {
    const urlParam = window.location.search;
    const paramArray = urlParam.substr(1).split('=');
    const noteId = paramArray[1];

    // // app-state // model
    const editNoteModel = {

        findNote: function (notes, id) {
            for(let i = 0; i < notes.length; i++) {
                if(notes[i].id === id){
                    return notes[i];
                }
            }
        },

        editNote: function (id) {
            let notes = localStorage.getItem("notes");
            if (!notes) {
                localStorage.setItem("notes", JSON.stringify([]));
                notes = localStorage.getItem("notes");
            }
            notes = JSON.parse(notes);
            return this.findNote(notes, id)
        },

        updateNote: function (note) {
            if (typeof(Storage) !== "undefined") {
                let notes = JSON.parse(localStorage.getItem("notes"));
                if (!notes){
                    notes = localStorage.setItem("notes", JSON.stringify([]));
                }
                let index = notes.findIndex(function(n, i){
                    return n.id === note.id;
                });
                let oldnote = notes.splice(index, 1);
                note.created_at = oldnote[0].created_at;
                note.finished = oldnote[0].finished;
                notes.push(note);
                localStorage.setItem("notes", JSON.stringify(notes));
            } else {
                console.log("Sorry, your browser does not support Web Storage...");
            }
        },
    };

    // // UI-Refs
    let inputTitle;
    let inputDescription;
    let inputDate;
    let inputRate;
    let updateButton;

    // // Controller / Event Listener
    const editNoteController = {
        renderUI: function (note) {
            const editNoteTemplate = $("#edit-note-template").html();
            const compiledEditNoteTemplate = Handlebars.compile(editNoteTemplate);
            $(".edit-note-template-content").html(compiledEditNoteTemplate(note));

            inputTitle = document.getElementById('edit-note-title');
            inputDescription = document.getElementById('edit-note-description');
            inputDate = document.getElementById('edit-note-date');
            inputRate = document.getElementById('rateInputId');
            updateButton = document.getElementById('edit-note-save');
        },
        registerListeners: function () {
            updateButton.onclick = function () {
                let note = { 'id': noteId, 'title': inputTitle.value, 'description': inputDescription.value, 'date': moment(inputDate.value), 'rate': inputRate.value };
                editNoteModel.updateNote(note);
                // window.location.href='index.html';
            };
        }
    };

    //initUI
    editNoteController.renderUI(editNoteModel.editNote(noteId));
    editNoteController.registerListeners();

};

window.onload = initEditNote;










