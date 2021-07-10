import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import CardList from '../alertDialog/card/CardList';
import Filter from './filter/Filter';
import Toast from '../toast/Toast';

const itemsFromBackend = [
  {
    id: uuid(),
    title: 'First task',
    reporter: 'First Reporter',
    category: 'First category',
    priority: 'High',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: 'Done',
  },
  {
    id: uuid(),
    title: 'Second task',
    reporter: 'Second Reporter',
    category: 'Second category',
    priority: 'High',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: 'In Progress',
  },
  {
    id: uuid(),
    title: 'Third task',
    reporter: 'Third Reporter',
    category: 'First category',
    priority: 'Medium',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: 'To Do',
  },
  {
    id: uuid(),
    title: 'Fourth task',
    reporter: 'Fourth Reporter',
    category: 'Third category',
    priority: 'High',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: 'Ready for QA',
  },
  {
    id: uuid(),
    title: 'Fifth task',
    reporter: 'Fifth Reporter',
    category: 'Second category',
    priority: 'Low',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: 'Ready for QA',
  },
];

const toDoItems = itemsFromBackend.filter(
  (element) => element.status === 'To Do'
);
const inProgressItems = itemsFromBackend.filter(
  (element) => element.status === 'In Progress'
);
const qaItems = itemsFromBackend.filter(
  (element) => element.status === 'Ready for QA'
);
const doneItems = itemsFromBackend.filter(
  (element) => element.status === 'Done'
);

const columnsFromBackend = {
  [uuid()]: {
    name: 'To Do',
    items: toDoItems,
  },
  [uuid()]: {
    name: 'In Progress',
    items: inProgressItems,
  },
  [uuid()]: {
    name: 'Ready for QA',
    items: qaItems,
  },
  [uuid()]: {
    name: 'Done',
    items: doneItems,
  },
};

const handleDrag = (
  curStatus,
  prevStatus,
  cardId,
  cardIndex,
  columns,
  setColumns,
  setToastStatus
) => {
  var tempResult = [];

  for (var i in columnsFromBackend) tempResult.push([i, columnsFromBackend[i]]);

  const destData = tempResult.filter(
    (element) => element[1].name === curStatus
  );

  const sourceData = tempResult.filter(
    (element) => element[1].name === prevStatus
  );

  const result = {
    combine: null,
    destination: {
      index: 0,
      droppableId: destData[0][0],
    },
    draggableId: cardId,
    mode: 'FLUID',
    reason: 'DROP',
    source: {
      index: cardIndex,
      droppableId: sourceData[0][0],
    },
    type: 'DEFAULT',
  };
  onDragEnd(result, columns, setColumns, setToastStatus);
};

const onDragEnd = (result, columns, setColumns, setToastStatus) => {
  console.log(typeof setToastStatus);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    sourceItems.forEach((element) => {
      element.status = sourceColumn.name;
    });
    destItems.forEach((element) => {
      element.status = destColumn.name;
    });
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    copiedItems.forEach((element) => {
      element.status = column.name;
    });
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
  setToastStatus(true);
};

function Board() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [toastStatus, setToastStatus] = useState(false);

  const dragHandler = (curStatus, prevStatus, cardId, cardIndex) => {
    handleDrag(
      curStatus,
      prevStatus,
      cardId,
      cardIndex,
      columns,
      setColumns,
      setToastStatus
    );
  };

  return (
    <div>
      <div className='filter__container'>
        <Filter
          columnsFromBackend={columnsFromBackend}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
      <br />
      <Toast openToast={toastStatus} setOpenToast={setToastStatus} />
      <br />
      <div className='board'>
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, columns, setColumns, setToastStatus)
          }
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <CardList
                key={index}
                columnId={columnId}
                column={column}
                dragHandler={dragHandler}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
