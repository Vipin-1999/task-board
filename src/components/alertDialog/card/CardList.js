import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const CardList = ({ column, columnId, dragHandler }) => {
  return (
    <div className='card__container' key={columnId}>
      <div className='card__list--heading'>
        <span>{column.name}</span>
        <span
          style={{ float: 'right', fontSize: '0.9rem', paddingTop: '0.4rem' }}
        >
          {column.items.length}
          {column.items.length === 1 ? <>&nbsp;Ticket</> : <>&nbsp;Tickets</>}
        </span>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => {
          return (
            <>
              <div className='card__list' ref={provided.innerRef}>
                {column.items &&
                  column.items.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        item={item}
                        index={index}
                        dragHandler={dragHandler}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            </>
          );
        }}
      </Droppable>
    </div>
  );
};

export default CardList;
