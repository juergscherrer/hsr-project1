
$( "#new-note-save" ).click(function() {

    var title = $("#new-note-title").val();
    var description = $("#new-note-description").val();
    var date = $("#new-note-date").val();
    var rate = $("#rateInputId").val();

    var newNote = { 'title': title, 'description': description, 'date': date, 'rate': rate };

    saveData(newNote);
    window.location.href='index.html';
});


function saveData(note){

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

}