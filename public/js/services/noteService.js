
const noteService = (() => {


   /* getNotes: async function (showfinished) {
        const res = await fetch('http://localhost:3000/notes');
        return await res.json();
    },*/
    // function getNotes (showfinished) {
    //     //     fetch('http://localhost:3000/notes').then(res => {
    //     //         return res.json()
    //     //     }).then(data => {
    //     //         console.log(data);
    //     //     });
    //     // }


    // function getNotes  (filter) {
    //     let notes = localStorage.getItem("notes");
    //     if (!notes) {
    //         localStorage.setItem("notes", JSON.stringify([]));
    //         notes = localStorage.getItem("notes");
    //     }
    //     notes = JSON.parse(notes);
    //     if (filter === "0"){
    //         let filteredNotes = [];
    //         for(let i = 0; i < notes.length; i++) {
    //             if(notes[i].finished === false){
    //                 filteredNotes.push(notes[i]);
    //             }
    //         }
    //         notes = filteredNotes;
    //
    //     }
    //     return sortNotes(1, notes);
    // }

    function getNotes (filter, sorting) {
        let url = 'http://localhost:3000/notes?filter='+filter+'&sort='+sorting;
        console.log(url);
        return fetch(url)
            .then(function(response) {
                return response.json();
            });
    }

    function saveNote (note){
        let url = 'http://localhost:3000/notes';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    function getNote (noteId) {
        let url = 'http://localhost:3000/notes/'+noteId;
        return fetch(url)
            .then(function(response) {
                return response.json();
            });
    }

    function updateNote (note) {
        let url = 'http://localhost:3000/notes/'+note._id;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    function finishNote (note) {
        var url = 'http://localhost:3000/notes/'+note._id;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    //
    // function saveNote  (note) {
    //     let notes = getNotes();
    //     notes.push(note);
    //     localStorage.setItem("notes", JSON.stringify(notes));
    // }

    // function updateNote  (note) {
    //     let notes = getNotes();
    //
    //     let index = notes.findIndex(function(n, i){
    //         return n.id === note.id;
    //     });
    //
    //     let oldNote = notes.splice(index, 1);
    //     note.created_at = oldNote[0].created_at;
    //     note.finished = oldNote[0].finished;
    //     notes.push(note);
    //     localStorage.setItem("notes", JSON.stringify(notes));
    // }

    // function deleteNote  (id) {
    //     let notes = getNotes();
    //     let index = notes.findIndex(function(n, i){
    //         return n.id === id;
    //     });
    //     console.log(index);
    //     notes.splice(index, 1);
    //     localStorage.setItem("notes", JSON.stringify(notes));
    // }

    // function finishNote (id) {
    //
    //     let notes = getNotes();
    //     let note = findNote(id);
    //
    //     let index = notes.findIndex(function(n, i){
    //         return n.id === note.id;
    //     });
    //     notes.splice(index, 1);
    //     console.log(note.finished);
    //     if (note.finished === false){
    //         note.finished = true;
    //     } else{
    //         note.finished = false;
    //     }
    //     notes.push(note);
    //     localStorage.setItem("notes", JSON.stringify(notes));
    // }

    // function findNote (id) {
    //     let notes = getNotes();
    //     for(let i = 0; i < notes.length; i++) {
    //         if(notes[i].id === id){
    //             return notes[i];
    //         }
    //     }
    // }

    function sortNotes(sortcode, notes) {
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
    }

    return {
        getNotes,
        saveNote,
        getNote,
        updateNote,
        // deleteNote,
        finishNote,
        sortNotes,
    }

})();