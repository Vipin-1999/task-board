import NativeSelect from '@material-ui/core/NativeSelect';

const Priority = ({ priority, handlePriorityChange }) => {
  return (
    <div className='status__container'>
      <div>
        <label className='priority--heading' htmlFor='priority'>
          PRIORITY
        </label>
      </div>
      <NativeSelect
        className='priority__input'
        value={priority}
        onChange={handlePriorityChange}
        inputProps={{
          name: 'priority',
          id: 'priority',
        }}
      >
        <option value='High'>High</option>
        <option value='Medium'>Medium</option>
        <option value='Low'>Low</option>
      </NativeSelect>
    </div>
  );
};

export default Priority;
