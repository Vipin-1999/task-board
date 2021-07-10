import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Low', 'Medium', 'High'];
}

const StepperPriority = ({ priority, handlePriorityChange }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(
    priority === 'Low' ? 0 : priority === 'Medium' ? 1 : 2
  );
  const steps = getSteps();

  const handleStep = (step) => () => {
    setActiveStep(step);
    handlePriorityChange(step === 0 ? 'Low' : step === 1 ? 'Medium' : 'High');
  };

  return (
    <div className={classes.root}>
      <label className='issue__priority--heading' htmlFor='issue__priority'>
        PRIORITY
      </label>
      <Stepper
        id='issue__priority'
        alternativeLabel
        nonLinear
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton onClick={handleStep(index)} {...buttonProps}>
                <b>{label}</b>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default StepperPriority;
