import DialogContentText from '@material-ui/core/DialogContentText';
import { useState } from 'react';
import ActionButton from '../button/ActionButton';

const Description = ({
  content,
  setContent,
  handleDescriptionSave,
  handleDescriptionCancel,
}) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <div>
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
        />
      </DialogContentText>
      <div className='modal__content--buttons' hidden={isHidden}>
        <ActionButton
          clickHandler={() => handleDescriptionSave(setHidden)}
          btnName='Save'
        />
        <ActionButton
          clickHandler={() => handleDescriptionCancel(setHidden)}
          btnName='Cancel'
        />
      </div>
    </div>
  );
};

export default Description;
