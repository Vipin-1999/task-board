import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Grid from '@material-ui/core/Grid';
import avatar from '../../../img/nat-8.jpg';

import Assignee from '../assignee/Assignee';
import Reporter from '../reporter/Reporter';
import Description from '../description/Description';
// import Status from '../status/Status';
import StepperStatus from '../status/StepperStatus';
import Category from '../category/Category';
import StepperPriority from '../priority/StepperPriority';
import { connect } from 'react-redux';

import { addTicket } from '../../../store/actions/ticketActions';

const CreateCard = (props) => {
  const { setOpenDrawer, addTicket } = props;
  const [title, setTitle] = useState('');
  const reporter = 'New Reporter';
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Low');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('To Do');

  const [openCard, setOpenCard] = useState(false);

  const resetData = () => {
    setTitle('');
    setCategory('');
    setContent('');
  };

  const handleCreateTaskOpen = () => {
    setOpenCard(true);
  };

  const handleCreateTaskClose = () => {
    setOpenCard(false);
    setOpenDrawer(false);
  };
  const handleStatusChange = (curValue, prevValue) => {
    setStatus(curValue);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleDescriptionSave = () => {
    console.info('You clicked the save.');
  };

  const handleDescriptionCancel = () => {
    // old value
    console.info('You clicked the cancel.');
  };

  const handleCreateCard = () => {
    addTicket({
      title,
      reporter,
      category,
      priority,
      content,
      status,
    });
    resetData();
    handleCreateTaskClose();
  };

  const handleCancelCreateCard = () => {
    resetData();
    handleCreateTaskClose();
  };

  return (
    <div>
      <div className='create__task__container' onClick={handleCreateTaskOpen}>
        <span className='material-icons create__task--icon'>add</span>
        <span className='create__task--heading'>Create Task</span>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openCard}
        onClose={handleCreateTaskClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Create New Task</DialogTitle>
        <Grid container>
          <Grid item xs={7} zeroMinWidth style={{ padding: '0 1rem 0 0' }}>
            <form>
              <DialogTitle id='alert-dialog-title'>
                <input
                  id='modal__title'
                  className='modal__title'
                  type='text'
                  placeholder='Title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </DialogTitle>
              <DialogContent>
                <Description
                  content={content}
                  setContent={setContent}
                  handleDescriptionSave={handleDescriptionSave}
                  handleDescriptionCancel={handleDescriptionCancel}
                />
              </DialogContent>
              <Category category={category} setCategory={setCategory} />
            </form>
          </Grid>
          <Grid item xs={4} zeroMinWidth style={{ padding: '0 0 0 1rem' }}>
            <form>
              <StepperStatus
                disabled={true}
                status={status}
                handleStatusChange={handleStatusChange}
              />
              {/* <Status status={status} handleStatusChange={handleStatusChange} /> */}
              <StepperPriority
                priority={priority}
                handlePriorityChange={handlePriorityChange}
              />
              <Assignee />
              <Reporter avatar={avatar} reporter={reporter} />
            </form>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleCancelCreateCard} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreateCard} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTicket: (ticket) => dispatch(addTicket(ticket)),
  };
};

export default connect(null, mapDispatchToProps)(CreateCard);
