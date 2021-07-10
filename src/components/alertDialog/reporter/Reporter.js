import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const Reporter = ({ avatar, reporter }) => {
  return (
    <div className='reporter__chip__container'>
      <label className='reporter__chip--heading' htmlFor='reporter__chip'>
        REPORTER
      </label>
      <div className='reporter__chip'>
        <Chip
          id='reporter__chip'
          avatar={<Avatar alt='Natacha' src={avatar} />}
          label={reporter}
        />
      </div>
    </div>
  );
};

export default Reporter;
