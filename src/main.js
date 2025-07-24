const noteColors = ["#FFD700", "#FF7F50", "#ADFF2F", "#87CEEB", "#FF69B4", "#DDA0DD", "#F08080", "#90EE90"];
const deleteSound = new Audio('../assets/deleteSound.wav');
const gettingNote = () => {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || '[]');
};

const savingingNote = (notes) => {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
};

const createNote = (id, content) => {
  const element = document.createElement('textarea');

  element.classList.add('note');
  element.value = content;
  element.placeholder = 'Empty';


  const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
  element.style.backgroundColor = randomColor;

  element.addEventListener('change', () => {
    updateingNote(id, element.value);
  });

  element.addEventListener('dblclick', () => {
    const doDelete = confirm("Are you sure?");
    if (doDelete) {
      deletingNote(id, element);
    }
  });

  return element;
};

const addingNote = () => {
  const existingNote = gettingNote();
  const notsObject = {
    id: Math.floor(Math.random() * 100000),
    content: ''
  };
  
  const notesElement = createNote(notsObject.id, notsObject.content);
  noteContainer.insertBefore(notesElement, addNoteButton);

  existingNote.push(notsObject);
  savingingNote(existingNote);
};

const updateingNote = (id, newContent) => {
  const notes = gettingNote();
  const targetNote = notes.find(note => note.id === id);
  if (targetNote) {
    targetNote.content = newContent;

  }
};

const deletingNote = (id, element) => {
  const notes = gettingNote().filter(note => note.id !== id);
  savingingNote(notes);
  noteContainer.removeChild(element);
   deleteSound.play();
};


const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".button");

gettingNote().forEach(note => {
  const noteElement = createNote(note.id, note.content);
  noteContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener('click', () => addingNote());
