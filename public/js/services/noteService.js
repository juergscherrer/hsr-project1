const noteService = (() => {

    const mainURL = 'http://localhost:3000/notes/';

    function getNotes(filter, sorting) {
        let url = mainURL + '?filter=' + filter + '&sort=' + sorting;
        return fetch(url)
            .then(function (response) {
                return response.json();
            });
    }

    function saveNote(note) {
        fetch(mainURL, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error));
    }

    function getNote(noteId) {
        let url = mainURL + noteId;
        return fetch(url)
            .then(function (response) {
                return response.json();
            });
    }

    function updateNote(note) {
        let url = mainURL + note._id;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error));
    }

    return {
        getNotes,
        saveNote,
        getNote,
        updateNote,
    }

})();