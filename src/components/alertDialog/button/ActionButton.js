import Button from '@material-ui/core/Button';

const ActionButton = (props) => {
  const { clickHandler, btnName } = props;
  return (
    <Button
      disabled={props.disabled ? props.disabled : ''}
      className={props.className ? props.className : ''}
      onClick={clickHandler}
      color='primary'
    >
      {btnName}
    </Button>
  );
};

export default ActionButton;
