import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Toast = ({ openToast, setOpenToast }) => {
  const classes = useStyles();

  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right',
  };

  const handleClose = () => {
    setOpenToast(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={4000}
        open={openToast}
        onClose={handleClose}
        message='Card Updated!'
      >
        <Alert onClose={handleClose} severity='success'>
          Card Status Updated!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
