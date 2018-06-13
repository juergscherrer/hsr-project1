const initEditNote = function () {
    const urlParam = window.location.search;
    const paramArray = urlParam.substr(1).split('=');
    const noteId = paramArray[1];


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
                let note = new Note(noteId, inputTitle.value, inputDescription.value, moment(inputDate.value), inputRate.value);
                noteService.updateNote(note);
                window.location.href='index.html';
            };
        }
    };

    //initUI
    editNoteController.renderUI(noteService.findNote(noteId));
    editNoteController.registerListeners();

};

window.onload = initEditNote;










