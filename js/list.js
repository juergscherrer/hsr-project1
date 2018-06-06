(function () {
    Handlebars.registerHelper('times', function (n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('format', function (date) {
        return moment(date).locale("de").format('LL');
    });

})();


const initList = function () {

    // // app-state // model
    const noteModel = {
        getNotes: function () {
            let notes = localStorage.getItem("notes");
            if (!notes) {
                localStorage.setItem("notes", JSON.stringify([]));
                notes = localStorage.getItem("notes");
            }

            return this.sortNotes(1, JSON.parse(notes));
        },

        deleteNote: function (id) {
            let notes = localStorage.getItem("notes");
            if (!notes) {
                localStorage.setItem("notes", JSON.stringify([]));
                notes = localStorage.getItem("notes");
            }
            notes = JSON.parse(notes);
            let index = notes.findIndex(function(n, i){
                return n.id === id;
            });
            console.log(index);
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        },

        sortNotes: function (sortcode, notes) {
            switch(sortcode) {
                case 1:
                    notes.sort(function(a,b){
                        var c = new Date(a.date);
                        var d = new Date(b.date);
                        return c-d;
                    });
                    break;
                case 2:
                    notes.sort(function(a,b){
                        var c = new Date(a.created_at);
                        var d = new Date(b.created_at);
                        return c-d;
                    });

                    break;
                case 3:
                    notes.sort(function(a,b){
                        var c = new Date(a.rate);
                        var d = new Date(b.rate);
                        return c-d;
                    });

                    break;
                default:
                    notes.sort(function(a,b){
                        var c = new Date(a.date);
                        var d = new Date(b.date);
                        return c-d;
                    });
            }
            return notes;
        },

        reverseNotes: function(reverseFlag, notes){
            if(reverseFlag === "0"){
                return notes;
            }
            return notes.reverse();
        }
    };

    //////////// IIFE setzens
    // // UI-Refs
    let deleteButtons;
    const sortByFinishedButton = document.getElementById('sort-by-finished');
    const sortByCreatedButton = document.getElementById('sort-by-created');
    const sortByRateButton = document.getElementById('sort-by-rate');
    const sortbyReverseButton = document.getElementById('sort-by-reverse');

    // // Controller / Event Listener
    const noteController = {
        renderUI: function (notes) {
            const notesTemplate = $("#notes-template").html();
            const compiledNotesTemplate = Handlebars.compile(notesTemplate);
            $(".notes-template-content").html(compiledNotesTemplate(notes));

            deleteButtons = document.querySelectorAll('.delete');
            this.registerListeners();
        },
        registerListeners: function () {
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    let noteId = e.currentTarget.dataset.deleteid
                    noteModel.deleteNote(noteId);
                    // this.renderUI(noteModel.getNotes());
                    // this.registerListeners();
                });
            });

            sortByFinishedButton.onclick = function () {
                noteController.renderUI(noteModel.sortNotes(1, noteModel.getNotes()));
                sortByFinishedButton.classList.add("active");
                sortByCreatedButton.classList.remove("active");
                sortByRateButton.classList.remove("active");
                sortbyReverseButton.dataset.sortcode = "1";
                sortbyReverseButton.dataset.reverse = "0";
            };
            sortByCreatedButton.onclick = function () {
                noteController.renderUI(noteModel.sortNotes(2, noteModel.getNotes()));
                sortByFinishedButton.classList.remove("active");
                sortByCreatedButton.classList.add("active");
                sortByRateButton.classList.remove("active");
                sortbyReverseButton.dataset.sortcode = "2";
                sortbyReverseButton.dataset.reverse = "0";
            };
            sortByRateButton.onclick = function () {
                noteController.renderUI(noteModel.sortNotes(3, noteModel.getNotes()));
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
                noteController.renderUI(noteModel.reverseNotes(sortbyReverseButton.dataset.reverse, noteModel.sortNotes(sortCode, noteModel.getNotes())));
            };
        }
    };

    //initUI
    noteController.renderUI(noteModel.getNotes());
    // noteController.registerListeners();

};

window.onload = initList;






