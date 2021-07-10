import { Draggable } from 'react-beautiful-dnd';
import AlertDialog from '../AlertDialog';

const Card = ({ item, index, dragHandler }) => {
  const { id, title, reporter, category, content, status, priority } = item;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => {
        return (
          <AlertDialog
            id={id}
            index={index}
            issue__title={title}
            reporter={reporter}
            category={category}
            description={content}
            issue__status={status}
            issue__priority={priority}
            provided={provided}
            dragHandler={dragHandler}
          />
        );
      }}
    </Draggable>
  );
};

export default Card;
