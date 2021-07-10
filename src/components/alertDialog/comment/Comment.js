import { useState } from 'react';
import ActionButton from '../button/ActionButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Comment = ({
  avatar,
  comment,
  setComment,
  handleCommentSave,
  handleCommentCancel,
}) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <div className='modal__comment__container'>
      <label className='modal__comment--heading' htmlFor='modal__comment'>
        Comments
      </label>
      <p style={{ margin: '6px 0' }}></p>
      <Grid container>
        <Grid item xs={1} zeroMinWidth style={{ padding: '0.8rem 0 0 0' }}>
          <Avatar
            alt='Remy Sharp'
            style={{ height: '1.3rem', width: '1.3rem' }}
            src={avatar}
          />
        </Grid>
        <Grid item xs={11} zeroMinWidth>
          <textarea
            className='modal__comment'
            type='text'
            id='modal__comment'
            placeholder='Add your comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onFocus={() => setHidden(false)}
          />
          <br />
          <div className='modal__comment--buttons' hidden={isHidden}>
            <ActionButton clickHandler={handleCommentSave} btnName='Save' />
            <ActionButton clickHandler={handleCommentCancel} btnName='Cancel' />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;
