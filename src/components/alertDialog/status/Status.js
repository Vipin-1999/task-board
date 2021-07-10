import NativeSelect from '@material-ui/core/NativeSelect';

const Status = ({ status, handleStatusChange }) => {
  return (
    <div className='status__container'>
      <label
        className='issue__status--heading'
        htmlFor='issue__status'
        style={{ padding: '2rem' }}
      >
        STATUS
      </label>
      <NativeSelect
        value={status}
        onChange={(event) => handleStatusChange(event.target.value)}
        inputProps={{
          name: 'status',
          id: 'issue__status',
        }}
      >
        <option value='In Progress'>In Progress</option>
        <option value='Ready for QA'>Ready for QA</option>
        <option value='Done'>Done</option>
      </NativeSelect>
    </div>
  );
};

export default Status;
