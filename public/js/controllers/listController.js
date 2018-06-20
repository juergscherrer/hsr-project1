const initList = async function () {


    //////////// IIFE setzens
    // // UI-Refs
    // let deleteButtons;
    let checkButtons;
    const sortByFinishedButton = document.getElementById('sort-by-finished');
    const sortByCreatedButton = document.getElementById('sort-by-created');
    const sortByRateButton = document.getElementById('sort-by-rate');
    const showFinishedNotesButton = document.getElementById('show-finished-notes-button');

    const notesTemplate = document.getElementById('notes-template').innerHTML;
    const createNotesHTML = Handlebars.compile(notesTemplate);
    const noteTemplateContent = document.getElementById('notes-template-content');

    // // Controller / Event Listener
    const noteController = {
        renderUI: function (notes) {

            noteTemplateContent.innerHTML = createNotesHTML(notes);

            // deleteButtons = document.querySelectorAll('.delete');
            checkButtons = document.querySelectorAll('.check');

            this.registerListeners();
        },

        changeButtonColors: function (state){
            switch(state) {
                case "1":
                    sortByFinishedButton.classList.add("active");
                    sortByCreatedButton.classList.remove("active");
                    sortByRateButton.classList.remove("active");

                    break;
                case "2":
                    sortByFinishedButton.classList.remove("active");
                    sortByCreatedButton.classList.add("active");
                    sortByRateButton.classList.remove("active");

                    break;
                case "3":
                    sortByFinishedButton.classList.remove("active");
                    sortByCreatedButton.classList.remove("active");
                    sortByRateButton.classList.add("active");

                    break;
                default:

            }
        },

        registerSortButtons: function (sortcode) {

            noteService.getNotes(showFinishedNotesButton.dataset.showfinished, sortcode).then(notes => {
                noteController.renderUI(notes);
            });
            noteController.changeButtonColors(sortcode);
        },

        registerListeners: function () {
            // deleteButtons.forEach(button => {
            //     button.addEventListener('click', (e) => {
            //         e.preventDefault();
            //         let noteId = e.currentTarget.dataset.deleteid
            //         noteService.deleteNote(noteId);
            //         this.renderUI(noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished));
            //         // this.registerListeners();
            //     });
            // });

            checkButtons.forEach(button => {
                // noinspection JSAnnotator
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    let noteId = e.currentTarget.dataset.checkid;
                    let finished = e.currentTarget.dataset.finished;
                    let note = new Note();
                    note._id = noteId;
                    note.finished = !(finished === "true");
                    console.log(note.finished);
                    noteService.finishNote(note);
                    // this.renderUI(noteService.getNotes(sortbyReverseButton.dataset.sortcode, showFinishedNotesButton.dataset.showfinished));

                    // const allNotes = await noteService.getNotes("0");
                    // noteController.renderUI(allNotes);

                    noteService.getNotes(showFinishedNotesButton.dataset.showfinished, sortByRateButton.dataset.sortcode).then(notes => {
                        noteController.renderUI(notes);
                    });

                });
            });

            sortByFinishedButton.onclick = function () {
                noteController.registerSortButtons(sortByFinishedButton.dataset.sortcode);
            };

            sortByCreatedButton.onclick = function () {
                noteController.registerSortButtons(sortByCreatedButton.dataset.sortcode);
            };

            sortByRateButton.onclick = function () {
                noteController.registerSortButtons(sortByRateButton.dataset.sortcode);
            };

            showFinishedNotesButton.onclick = function () {
                if (showFinishedNotesButton.dataset.showfinished === "0") {
                    showFinishedNotesButton.dataset.showfinished = "1";
                    showFinishedNotesButton.classList.add("active");
                } else {
                    showFinishedNotesButton.dataset.showfinished = "0";
                    showFinishedNotesButton.classList.remove("active");
                }
                console.log(showFinishedNotesButton.dataset.showfinished);
                noteService.getNotes(showFinishedNotesButton.dataset.showfinished, "1").then(notes => {
                    noteController.renderUI(notes);
                    noteController.changeButtonColors("1");
                });

            };
        },
    };

    //initUI
    const allNotes = await noteService.getNotes("0", "1");
    noteController.renderUI(allNotes);

   /* noteService.getNotes("0").then(notes => {
        noteController.renderUI(notes);
    });*/

};

window.onload = initList;