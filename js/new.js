const initNewNote = function () {

    function createId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }

    // // app-state // model
    const newNoteModel = {
        saveNote: function (note) {
            if (typeof(Storage) !== "undefined") {
                let notes = JSON.parse(localStorage.getItem("notes"));
                if (!notes){
                    notes = localStorage.setItem("notes", JSON.stringify([]));
                }
                notes.push(note);
                localStorage.setItem("notes", JSON.stringify(notes));
            } else {
                console.log("Sorry, your browser does not support Web Storage...");
            }
        },
    };


    // // UI-Refs
    const inputTitle = document.getElementById('new-note-title');
    const inputDescription = document.getElementById('new-note-description');
    const inputDate = document.getElementById('new-note-date');
    const inputRate = document.getElementById('rateInputId');
    const saveButton = document.getElementById('new-note-save');

    // // Controller / Event Listener
    const newNoteController = {
        renderUI: function () {
        },

        registerListeners: function () {
            saveButton.onclick = function () {
                let newNote = { 'id': createId(), 'title': inputTitle.value, 'description': inputDescription.value, 'date': moment(inputDate.value), 'rate': inputRate.value, 'finished': false, 'created_at': moment() };
                newNoteModel.saveNote(newNote);
                window.location.href='index.html';
            };
        }
    };

    //initUI
    newNoteController.registerListeners();

};

window.onload = initNewNote;






