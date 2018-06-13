const initList = function () {


    //////////// IIFE setzens
    // // UI-Refs
    let deleteButtons;
    let checkButtons;
    const sortByFinishedButton = document.getElementById('sort-by-finished');
    const sortByCreatedButton = document.getElementById('sort-by-created');
    const sortByRateButton = document.getElementById('sort-by-rate');
    const sortbyReverseButton = document.getElementById('sort-by-reverse');
    const showFinishedNotesButton = document.getElementById('show-finished-notes-button');

    const notesTemplate = document.getElementById('notes-template').innerHTML;
    const createNotesHTML = Handlebars.compile(notesTemplate);
    const noteTemplateContent = document.getElementById('notes-template-content');

    // // Controller / Event Listener
    const noteController = {
        renderUI: function (notes) {


            // noteTemplateContent.appendChild(createNotesHTML(notes));

            $("#notes-template-content").html(createNotesHTML(notes));

            deleteButtons = document.querySelectorAll('.delete');
            checkButtons = document.querySelectorAll('.check');
            this.registerListeners();
        },
        registerListeners: function () {
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    let noteId = e.currentTarget.dataset.deleteid
                    noteService.deleteNote(noteId);
                    this.renderUI(noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished));
                    // this.registerListeners();
                });
            });

            checkButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    let noteId = e.currentTarget.dataset.checkid
                    noteService.finishNote(noteId);
                    this.renderUI(noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished));
                });
            });

            sortByFinishedButton.onclick = function () {
                noteController.renderUI(noteService.sortNotes(1, noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished)));
                sortByFinishedButton.classList.add("active");
                sortByCreatedButton.classList.remove("active");
                sortByRateButton.classList.remove("active");
                sortbyReverseButton.dataset.sortcode = "1";
                sortbyReverseButton.dataset.reverse = "0";
            };

            sortByCreatedButton.onclick = function () {
                noteController.renderUI(noteService.sortNotes(2, noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished)));
                sortByFinishedButton.classList.remove("active");
                sortByCreatedButton.classList.add("active");
                sortByRateButton.classList.remove("active");
                sortbyReverseButton.dataset.sortcode = "2";
                sortbyReverseButton.dataset.reverse = "0";
            };

            sortByRateButton.onclick = function () {
                noteController.renderUI(noteService.sortNotes(3, noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished)));
                sortByFinishedButton.classList.remove("active");
                sortByCreatedButton.classList.remove("active");
                sortByRateButton.classList.add("active");
                sortbyReverseButton.dataset.sortcode = "3";
                sortbyReverseButton.dataset.reverse = "0";
            };

            sortbyReverseButton.onclick = function () {
                if (sortbyReverseButton.dataset.reverse === "0"){
                    sortbyReverseButton.dataset.reverse = "1"
                } else {
                    sortbyReverseButton.dataset.reverse = "0"
                }
                let sortCode = parseInt(sortbyReverseButton.dataset.sortcode);
                noteController.renderUI(noteService.reverseNotes(sortbyReverseButton.dataset.reverse, noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished)));
            };

            showFinishedNotesButton.onclick = function () {
                if (showFinishedNotesButton.dataset.showfinished === "0"){
                    showFinishedNotesButton.dataset.showfinished = "1";
                    showFinishedNotesButton.classList.add("active");
                } else {
                    showFinishedNotesButton.dataset.showfinished = "0";
                    showFinishedNotesButton.classList.remove("active");
                }
                noteController.renderUI(noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished));
            };
        }
    };

    //initUI
    noteController.renderUI(noteService.getNotes("1", "0"));
    // noteController.registerListeners();

};

window.onload = initList;






