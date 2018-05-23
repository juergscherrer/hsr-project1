(function() {
    var node_id = window.location.search;
    var tmp = node_id.substr(1).split('=');
    editNote(tmp[1]);
})();








function editNote(id){

    var notes = localStorage.getItem("notes");
    if (!notes) {
        localStorage.setItem("notes", JSON.stringify([]));
        notes = localStorage.getItem("notes");
    }
    notes = JSON.parse(notes);

    var note = notes[id]
    var editNoteTemplate = $("#edit-note-template").html();
    console.log(editNoteTemplate);
    var compiledEditNoteTemplate = Handlebars.compile(editNoteTemplate);
    $(".edit-note-template-content").html(compiledEditNoteTemplate(note));
}


