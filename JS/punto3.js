const content = document.querySelector('.content');
const buttonSave = document.querySelector('.save');
const buttonDelete = document.querySelector('.delete');
const alertMessage = document.querySelector('.alert');
const title = document.querySelector('.title');
const text = document.querySelector('#text');
const search = document.querySelector('.search');
const done = document.querySelector('#flexSwitchCheckDefault');

const notes = [
    {
        ID: 1,
        title: 'Realizar Hoja de vida',
        text: 'Se debe realizar la hoja de vida',
        done: false,
    },

    {
        ID: 2,
        title: 'Empezar taller',
        text: 'Debo empezar el taller de sistemas operativos',
        done: false,
    },

    {
        ID: 3,
        title: 'Hacer aseo',
        text: 'Hacer el aseo del cuarto donde duermo',
        done: false,
    },
];

insertNote(notes);

buttonSave.addEventListener('click', () => { addNote(); });
buttonDelete.addEventListener('click', () => { removeFields(); });

done.addEventListener('change', () => { insertNote(filters()) });
search.addEventListener('input', () => { insertNote(filters()) });

function createNote(id, title, text, done) {

    let note = "<div class=\"card text-center mb-3\" style=\"width: 18rem;\">\n" +
        "<div class=\"card-body\">\n" +
        "<div class=\"form-check form-check-inline\">\n" +
        "<input id=" + id + " class=\"form-check-input\" onclick=markmade(id) type=\"checkbox\"" + (done ? "checked" : "") + ">\n" +
        "<label class=\"form-check-label\" for=\"inlineCheckbox1\">" + title + "</label>\n" +
        "</div>\n" + (done ? "<p class=\"card-text\"><s>" + text + "</s></p>\n" : "<p class=\"card-text\">" + text + "</p>\n") +
        "<button id=" + id + " type=\"button\" class=\"btn btn-danger\" onclick=clearNote(id)" +
        "> Borrar Nota </button>\n" +
        "</div>\n" +
        "</div>";
    return note;
}

function insertNote(listNotes) {
    removeElements();
    if (listNotes.length != 0) {
        for (const note of listNotes) {
            let noteCreate = createNote(note.ID, note.title, note.text, note.done);
            content.innerHTML += noteCreate;
        }
    } else {
        let messageEmpty = document.createElement('div');
        messageEmpty.className = 'messageEmpty';
        messageEmpty.textContent = 'NO NOTES TO SHOW';
        content.appendChild(messageEmpty);
    }
}

function addNote() {
    let valueText = text.value;
    let valueTitle = title.value;
    if (validationsEmpty()) {
        alertMessage.className = 'alert inactive';
        let maxId = getMaxId();
        if (typeof (getMaxId()) == 'object') {
            maxId = 1;
        }
        let newNote = {
            ID: maxId + 1,
            title: valueTitle,
            text: valueText,
            done: false,
        }
        notes.push(newNote);
        insertNote(filters(notes));
    } else {
        alertMessage.className = 'alert';
    }
}

function markmade(id) {
    let note = notes.find(n => n.ID == id);
    note.done = (note.done) ? false : true;
    insertNote(filters(notes));
}

function clearNote(id) {
    for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if (element.ID == parseInt(id)) {
            notes.splice(i, 1);
            break;
        }
    }
    insertNote(filters(notes));
}

function removeElements() {
    let elements = content.children;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.remove();
        i--;
    }
}

function filterSearh(list) {
    return list.filter((note) => wordSearch(search.value, note));
}

function filterDone(list) {
    return list.filter((note) => note.done == done.checked);
}

function filters() {
    if (isDone()) {
        return filterSearh(filterDone(notes));
    } else {
        return filterSearh(notes);
    }
}

let getMaxId = () => { return (notes.length != 0) ? notes.reduce((previous, current) => { return (previous.ID > current.ID) ? previous.ID : current.ID }) : 0 };

let validationsEmpty = () => { return title.value != "" && text.value != "" };

let removeFields = () => { title.value = ""; text.value = "" };

let isDone = () => { return done.checked };

let wordSearch = (word, wordsNote) => { return (lowercaseWord(wordsNote.title).includes(lowercaseWord(word))) || (lowercaseWord(wordsNote.text).includes(lowercaseWord(word))); };

let lowercaseWord = (word) => { return word.toLowerCase(); };