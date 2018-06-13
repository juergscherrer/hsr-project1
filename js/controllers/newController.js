const initNewNote = function () {
// Provisorische Function
    function createId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }


    // // UI-Refs
    const inputTitle = document.getElementById('new-note-title');
    const inputDescription = document.getElementById('new-note-description');
    const inputDate = document.getElementById('new-note-date');
    const saveButton = document.getElementById('new-note-save');
    const inputRate = document.getElementById("new-note-rate-input");
    const inputRateOut = document.getElementById("new-note-rate-output");
    const noteForm = document.getElementById(('note-form'));

    const displayRangeValue = function () {
        inputRateOut.value = inputRate.value;
    };

    inputRate.oninput = displayRangeValue;



    // // Controller / Event Listener
    const newNoteController = {
        registerListeners: function () {
            saveButton.onclick = function () {
                if(noteForm.checkValidity()){
                    let note = new Note(createId(), inputTitle.value, inputDescription.value, moment(inputDate.value), inputRate.value);
                    noteService.saveNote(note);
                    return document.location.href='index.html';
                }
            };
        }
    };

    //initUI
    newNoteController.registerListeners();

};

window.onload = initNewNote;
