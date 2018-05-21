loadData();

function loadData(){
    var notes = localStorage.getItem("notes");
    if( !notes )
    {
        localStorage.setItem("notes", JSON.stringify([]));
        notes = localStorage.getItem("notes");
    }
    notes = JSON.parse(notes);
    console.log(notes);
    loadTable(notes);
}

function loadTable(notes){
    var notesTemplate = $("#notes-template").html();
    var compiledNotesTemplate = Handlebars.compile(notesTemplate);
    $(".notes-template-content").html(compiledNotesTemplate(notes));

}