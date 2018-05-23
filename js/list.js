
(function() {
    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });
})();




// $(document).on('click', '.delete', function () {
//     console.log("delete");
//     var id = $(this).attr('id').split('_');
//     deleteNote(id);
//
// })





const initList = function () {

    // // app-state // model
    // let count = 0;

    function loadData(){
        var notes = localStorage.getItem("notes");
        if( !notes )
        {
            localStorage.setItem("notes", JSON.stringify([]));
            notes = localStorage.getItem("notes");
        }
        notes = JSON.parse(notes);

        var notesTemplate = $("#notes-template").html();
        var compiledNotesTemplate = Handlebars.compile(notesTemplate);
        $(".notes-template-content").html(compiledNotesTemplate(notes));
    }

    function deleteNote(id){
        var notes = localStorage.getItem("notes");
        if (!notes) {
            localStorage.setItem("notes", JSON.stringify([]));
            notes = localStorage.getItem("notes");
        }
        notes = JSON.parse(notes);
        notes.splice(id[1], 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadData();
    }

    //initUI
    loadData();

    //
    // // UI-Refs
    const deleteButtons = document.querySelectorAll('.delete');
    console.log(deleteButtons);
    // const upButton = document.getElementById('upBtn');
    // const downButton = document.getElementById('downBtn');
    //
    //
    // // Update / Render
    // const renderUI = function () {
    //     countDiv.innerHTML = count;
    // };
    //
    // // Controller / Event Listener
    deleteButtons.forEach(button => {
       button.addEventListener('click', (e) => {
           deleteNote(e.currentTarget.dataset.deleteid);
       });
    });
    // downButton.onclick = function () {
    //     countDown();
    //     renderUI();
    // };

};

window.onload = initList;






