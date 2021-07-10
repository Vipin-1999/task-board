import DialogContentText from '@material-ui/core/DialogContentText';
import { useState } from 'react';
import ActionButton from '../button/ActionButton';

const Description = ({ content, setContent, handleSave, handleCancel }) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <>
      <DialogContentText id='alert-dialog-description'>
        <label className='modal__content--heading' htmlFor='modal__content'>
          Description
        </label>
        <p style={{ margin: '6px 0' }}></p>
        <textarea
          className='modal__content'
          type='text'
          id='modal__content'
          placeholder='Describe your task'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onFocus={() => setHidden(false)}
          onBlur={() => setHidden(true)}
        />
      </DialogContentText>
      <div className='modal__content--buttons' hidden={isHidden}>
        <ActionButton clickHandler={handleSave} btnName='Save' />
        <ActionButton clickHandler={handleCancel} btnName='Cancel' />
      </div>
    </>
  );
};

export default Description;
