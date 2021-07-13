import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardList from '../alertDialog/card/CardList';
import Filter from './filter/Filter';
import Toast from '../toast/Toast';
import { connect } from 'react-redux';

import { db } from '../../store/fbConfig';
import { addColumn, updateTicket } from '../../store/actions/ticketActions';

function Board(props) {
  const { updateTicket, alltickets } = props;

  var tempArray = alltickets;
  const itemsFromBackend = tempArray.map((element) => ({ ...element }));

  const toDoItems = itemsFromBackend
    .filter((element) => element.status === 'To Do')
    .sort(function (a, b) {
      return a.cardIndex - b.cardIndex;
    });
  const inProgressItems = itemsFromBackend
    .filter((element) => element.status === 'In Progress')
    .sort(function (a, b) {
      return a.cardIndex - b.cardIndex;
    });
  const qaItems = itemsFromBackend
    .filter((element) => element.status === 'Ready for QA')
    .sort(function (a, b) {
      return a.cardIndex - b.cardIndex;
    });
  const doneItems = itemsFromBackend
    .filter((element) => element.status === 'Done')
    .sort(function (a, b) {
      return a.cardIndex - b.cardIndex;
    });

  const columnsFromBackend = {
    ['to-do-column']: {
      name: 'To Do',
      items: toDoItems,
    },
    ['in-progress-column']: {
      name: 'In Progress',
      items: inProgressItems,
    },
    ['ready-for-qa-column']: {
      name: 'Ready for QA',
      items: qaItems,
    },
    ['done-column']: {
      name: 'Done',
      items: doneItems,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    setColumns(columnsFromBackend);
  }, []);

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

    for (var i in columnsFromBackend)
      tempResult.push([i, columnsFromBackend[i]]);

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
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      sourceItems.forEach((element, index) => {
        element.status = sourceColumn.name;
        element.cardIndex = index;
        updateTicket(element.id, element);
      });
      destItems.forEach((element, index) => {
        element.status = destColumn.name;
        element.cardIndex = index;
        updateTicket(element.id, element);
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
      // addColumnHandler(sourceColumn.name, sourceItems);
      // addColumnHandler(destColumn.name, destItems);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      copiedItems.forEach((element, index) => {
        element.status = column.name;
        element.cardIndex = index;
        updateTicket(element.id, element);
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    // addColumnHandler(colName, colItems);
    setToastStatus(true);
  };

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

const mapDispatchToProps = (dispatch) => {
  return {
    updateTicket: (docId, ticket) => dispatch(updateTicket(docId, ticket)),
    addColumn: (name, ticketArray) => dispatch(addColumn(name, ticketArray)),
  };
};

export default connect(null, mapDispatchToProps)(Board);
