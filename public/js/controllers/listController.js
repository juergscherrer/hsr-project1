const initList = async function () {



    // UI-Refs
    let checkButtons;
    const sortByFinishedButton = document.getElementById('sort-by-finished');
    const sortByCreatedButton = document.getElementById('sort-by-created');
    const sortByRateButton = document.getElementById('sort-by-rate');
    const showFinishedNotesButton = document.getElementById('show-finished-notes-button');

    const notesTemplate = document.getElementById('notes-template').innerHTML;
    const createNotesHTML = Handlebars.compile(notesTemplate);
    const noteTemplateContent = document.getElementById('notes-template-content');

    // Controller / Event Listener
    const noteController = {
        renderUI: function (notes, sortcode) {

            noteTemplateContent.innerHTML = createNotesHTML(notes);
            checkButtons = document.querySelectorAll('.check');

            this.registerListeners();
            noteController.changeButtonColors(sortcode);
        },

        changeButtonColors: function (state) {
            switch (state) {
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

        registerSortButtons: async function (sortcode) {

            const notes = await noteService.getNotes(showFinishedNotesButton.dataset.showfinished, sortcode);
            noteController.renderUI(notes, sortcode);
        },

        registerListeners: function () {

            checkButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    let noteId = e.currentTarget.dataset.checkid;
                    let finished = e.currentTarget.dataset.finished;
                    let note = new Note();
                    note._id = noteId;
                    note.finished = !(finished === "true");
                    noteService.updateNote(note);

                    const notes = await noteService.getNotes(showFinishedNotesButton.dataset.showfinished, sortByRateButton.dataset.sortcode);
                    noteController.renderUI(notes);
                });
            });

            sortByFinishedButton.onclick = function () {
                noteController.registerSortButtons(sortByFinishedButton.dataset.sortcode);
                showFinishedNotesButton.dataset.sortcode = sortByFinishedButton.dataset.sortcode;
            };

            sortByCreatedButton.onclick = function () {
                noteController.registerSortButtons(sortByCreatedButton.dataset.sortcode);
                showFinishedNotesButton.dataset.sortcode = sortByCreatedButton.dataset.sortcode;
            };

            sortByRateButton.onclick = function () {
                noteController.registerSortButtons(sortByRateButton.dataset.sortcode);
                showFinishedNotesButton.dataset.sortcode = sortByRateButton.dataset.sortcode;
            };

            showFinishedNotesButton.onclick = async function () {
                if (showFinishedNotesButton.dataset.showfinished === "0") {
                    showFinishedNotesButton.dataset.showfinished = "1";
                    showFinishedNotesButton.classList.add("active");
                } else {
                    showFinishedNotesButton.dataset.showfinished = "0";
                    showFinishedNotesButton.classList.remove("active");
                }

                const notes = await noteService.getNotes(showFinishedNotesButton.dataset.showfinished, showFinishedNotesButton.dataset.sortcode);
                noteController.renderUI(notes, showFinishedNotesButton.dataset.sortcode);
            };
        },
    };

    //initUI
    const notes = await noteService.getNotes("0", "1");
    noteController.renderUI(notes, "1");
};

window.onload = initList;