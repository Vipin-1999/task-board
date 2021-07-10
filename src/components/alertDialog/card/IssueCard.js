import Avatar from '@material-ui/core/Avatar';

const IssueCard = ({
  handleClickOpen,
  provided,
  title,
  category,
  avatar,
  priority,
  index,
}) => {
  const subHeading =
    category === 'First category'
      ? 'card__heading--sub-first'
      : category === 'Second category'
      ? 'card__heading--sub-second'
      : 'card__heading--sub-third';
  return (
    <div
      className='card__style'
      onClick={handleClickOpen}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <div className='card__heading--main'>
        {title}
        <span className='card__avatar'>
          <Avatar
            alt='Remy Sharp'
            style={{ height: '1.3rem', width: '1.3rem' }}
            src={avatar}
          />
        </span>
      </div>
      <div className={`card__heading--sub ${subHeading}`}>{category}</div>
      <div style={{ padding: '1rem 0 2rem 0' }}>
        <label>
          <span className='card__footer--left'>
            <span>Task - {index + 1}</span>
          </span>

          <span className='card__footer--right'>
            {priority}
            <span className={`material-icons ${priority}`}>trending_flat</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default IssueCard;
