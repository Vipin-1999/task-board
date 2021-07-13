import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import avatar from '../../img/nat-8.jpg';

import Assignee from './assignee/Assignee';
import Reporter from './reporter/Reporter';
import ActionButton from './button/ActionButton';
import Description from './description/Description';
import IssueCard from './card/IssueCard';
import StepperStatus from './status/StepperStatus';

import Comment from './comment/Comment';
import StepperPriority from './priority/StepperPriority';

import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

import { connect } from 'react-redux';
import { deleteTicket } from '../../store/actions/ticketActions';

const AlertDialog = ({
  id,
  index,
  issue__title,
  reporter,
  category,
  description,
  issue__status,
  issue__priority,
  provided,
  dragHandler,
  deleteTicket,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(issue__title);
  const [status, setStatus] = useState(issue__status);
  const [priority, setPriority] = useState(issue__priority);
  const [prevContentValue, setPrevContentValue] = useState(description);
  const [prevCommentValue, setPrevCommentValue] = useState('');
  const [content, setContent] = useState(description);
  const [comment, setComment] = useState('');

  const todoIcon = <span className='material-icons todoIcon'>date_range</span>;

  const progressIcon = (
    <span className='material-icons progressIcon'>pending</span>
  );
  const qaIcon = <span className='material-icons qaIcon'>lightbulb</span>;

  const doneIcon = <Checkbox checked={true} style={{ color: '#03a9f4' }} />;

  const displayIcon =
    issue__status === 'To Do'
      ? todoIcon
      : issue__status === 'In Progress'
      ? progressIcon
      : issue__status === 'Ready for QA'
      ? qaIcon
      : doneIcon;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // save to db
    setOpen(false);
  };

  const handleStatusChange = (curValue, prevValue) => {
    setStatus(curValue);
    dragHandler(curValue, prevValue, id, index);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleDescriptionSave = (setDescriptionHidden) => {
    setDescriptionHidden(true);
    setPrevContentValue(content);
  };

  const handleDescriptionCancel = (setDescriptionHidden) => {
    setDescriptionHidden(true);
    setContent(prevContentValue);
  };

  const handleCommentSave = (setCommentHidden) => {
    setCommentHidden(true);
    setPrevCommentValue(comment);
  };

  const handleCommentCancel = (setCommentHidden) => {
    setCommentHidden(true);
    setComment(prevCommentValue);
  };

  const handleDelete = () => {
    deleteTicket(id);
  };

  return (
    <div>
      <IssueCard
        handleClickOpen={handleClickOpen}
        provided={provided}
        title={title}
        category={category}
        avatar={avatar}
        priority={priority}
        index={index}
      />
      <div style={{ margin: '4px 0' }}></div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <span>
          <span style={{ margin: '1rem 0 0 1.5rem', float: 'left' }}>
            <FormControlLabel
              disabled
              control={displayIcon}
              label={<span>Task - {index + 1}</span>}
              labelPlacement='end'
            />
          </span>
          <Tooltip
            title='Delete'
            placement='left'
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <span style={{ float: 'right' }}>
              <span
                class='material-icons delete__task--icon'
                onClick={handleDelete}
              >
                delete
              </span>
            </span>
          </Tooltip>
        </span>
        <Grid container>
          <Grid item xs={7} zeroMinWidth style={{ padding: '0 1rem 0 0' }}>
            <form>
              <DialogTitle id='alert-dialog-title'>
                <input
                  className='modal__title'
                  type='text'
                  id='modal__title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </DialogTitle>
              <DialogContent>
                {/* <TextEditor content={content} setContent={setContent} /> */}
                <Description
                  content={content}
                  setContent={setContent}
                  handleDescriptionSave={handleDescriptionSave}
                  handleDescriptionCancel={handleDescriptionCancel}
                />
              </DialogContent>
              <Comment
                avatar={avatar}
                comment={comment}
                setComment={setComment}
                handleCommentSave={handleCommentSave}
                handleCommentCancel={handleCommentCancel}
              />
            </form>
          </Grid>
          <Grid item xs={4} zeroMinWidth style={{ padding: '0 0 0 1rem' }}>
            <form>
              <StepperStatus
                status={status}
                handleStatusChange={handleStatusChange}
              />
              <StepperPriority
                priority={priority}
                handlePriorityChange={handlePriorityChange}
              />
              {/* <Priority
                priority={priority}
                handlePriorityChange={handlePriorityChange}
              /> */}
              <Assignee />
              <Reporter avatar={avatar} reporter={reporter} />
            </form>
          </Grid>
        </Grid>
        <DialogActions>
          <ActionButton clickHandler={handleClose} btnName='Close' />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTicket: (docId) => dispatch(deleteTicket(docId)),
  };
};

export default connect(null, mapDispatchToProps)(AlertDialog);
