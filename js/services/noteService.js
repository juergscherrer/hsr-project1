
const noteService = {


    // getNotes: function (showfinished) {
    //
    //     fetch('http://localhost:3000/notes')
    //         .then(function(response) {
    //             return response.json();
    //         })
    //         .then(function(myJson) {
    //             console.log(myJson);
    //         });
    //
    // },

    getNotes: function (sort, filter) {
        let notes = localStorage.getItem("notes");
        if (!notes) {
            localStorage.setItem("notes", JSON.stringify([]));
            notes = localStorage.getItem("notes");
        }
        notes = JSON.parse(notes);
        if (filter === "0"){
            let filteredNotes = [];
            for(let i = 0; i < notes.length; i++) {
                if(notes[i].finished === false){
                    filteredNotes.push(notes[i]);
                }
            }
            notes = filteredNotes;

        }
        return this.sortNotes(1, notes);
    },

    saveNote: function (note) {
        let notes = noteService.getNotes();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    },

    updateNote: function (note) {
        let notes = noteService.getNotes();

        let index = notes.findIndex(function(n, i){
            return n.id === note.id;
        });

        let oldNote = notes.splice(index, 1);
        note.created_at = oldNote[0].created_at;
        note.finished = oldNote[0].finished;
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    },

    deleteNote: function (id) {
        let notes = noteService.getNotes();
        let index = notes.findIndex(function(n, i){
            return n.id === id;
        });
        console.log(index);
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
    },

    finishNote: function (id) {

        let notes = noteService.getNotes();
        let note = noteService.findNote(id);

        let index = notes.findIndex(function(n, i){
            return n.id === note.id;
        });
        notes.splice(index, 1);
        console.log(note.finished);
        if (note.finished === false){
            note.finished = true;
        } else{
            note.finished = false;
        }
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    },

    findNote: function (id) {
        let notes = noteService.getNotes();
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].id === id){
                return notes[i];
            }
        }
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
    },

};