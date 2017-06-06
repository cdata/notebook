const NoteAction = {
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove'
};

const notes = (action, notes=[]) => {
  switch (action.type) {
    case NoteAction.ADD:
      return [
        ...notes,
        action.note
      ];
    case NoteAction.REMOVE:
      return notes.filter(note => note !== action.note);
    default:
      return notes;
  }
};

export { notes, NoteAction };
