const addColumnHandler = (colName, colItems) => {
  const colId =
    colName === 'Done'
      ? 'done-column'
      : colName === 'Ready for QA'
      ? 'ready-for-qa-column'
      : colName === 'In Progress'
      ? 'in-progress-column'
      : 'to-do-column';
  db.collection('columns')
    .doc(colId)
    .set({ name: colName, items: [...colItems] })
    .catch((err) => {
      console.log(err);
    });
};
