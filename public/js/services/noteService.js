const noteService = (() => {

    function getNotes (filter, sorting) {
        let url = 'http://localhost:3000/notes?filter='+filter+'&sort='+sorting;
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

    return {
        getNotes,
        saveNote,
        getNote,
        updateNote,
    }

})();