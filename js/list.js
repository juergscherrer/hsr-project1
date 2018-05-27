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
            return JSON.parse(notes);
        },

        deleteNote: function (id) {
            let notes = localStorage.getItem("notes");
            if (!notes) {
                localStorage.setItem("notes", JSON.stringify([]));
                notes = localStorage.getItem("notes");
            }
            notes = JSON.parse(notes);
            console.log(id);
            notes.splice(id, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        },
    };


    // // UI-Refs
    let deleteButtons = "";

    // // Controller / Event Listener
    const noteController = {
        renderUI: function (notes) {
            const notesTemplate = $("#notes-template").html();
            const compiledNotesTemplate = Handlebars.compile(notesTemplate);
            $(".notes-template-content").html(compiledNotesTemplate(notes));

            deleteButtons = document.querySelectorAll('.delete');
        },
        registerListeners: function () {
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    let noteId = e.currentTarget.dataset.deleteid
                    noteModel.deleteNote(parseInt(noteId));
                    this.renderUI(noteModel.getNotes());
                    this.registerListeners();
                });
            });
        }
    };

    //initUI
    noteController.renderUI(noteModel.getNotes());
    noteController.registerListeners();

};

window.onload = initList;






