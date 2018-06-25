const initEditNote = async function () {
    const urlParam = window.location.search;
    const paramArray = urlParam.substr(1).split('=');
    const noteId = paramArray[1];


    // // UI-Refs
    let inputTitle;
    let inputDescription;
    let inputDate;
    let inputRate;
    let updateButton;
    let inputRateOut;
    let noteForm;
    let notesTemplate;
    let createNotesHTML;
    let noteTemplateContent;

    // // Controller / Event Listener
    const editNoteController = {
        renderUI: function (note) {

            notesTemplate = document.getElementById('note-template').innerHTML;
            createNotesHTML = Handlebars.compile(notesTemplate);
            noteTemplateContent = document.getElementById('note-template-content');
            noteTemplateContent.innerHTML = createNotesHTML(note);

            inputTitle = document.getElementById('note-title');
            inputDescription = document.getElementById('note-description');
            inputDate = document.getElementById('note-date');
            inputRate = document.getElementById('note-rate-input');
            inputRateOut = document.getElementById("note-rate-output");
            updateButton = document.getElementById('note-save');
            noteForm = document.getElementById('note-form');

            const displayRangeValue = function () {
                inputRateOut.value = inputRate.value;
            };

            inputRate.oninput = displayRangeValue;
        },
        registerListeners: function () {
            updateButton.onclick = function () {
                if (noteForm.checkValidity()) {
                    let note = new Note(noteId, inputTitle.value, inputDescription.value, moment(inputDate.value), inputRate.value);
                    if (noteId) {
                        noteService.updateNote(note);
                    } else {
                        noteService.saveNote(note);
                    }
                    window.location.href = '/index.html';
                }
            };
        }
    };

    //initUI
    const note = await noteService.getNote(noteId);
    editNoteController.renderUI(note[0]);
    editNoteController.registerListeners();

};

window.onload = initEditNote;
