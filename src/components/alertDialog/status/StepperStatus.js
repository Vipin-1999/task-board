import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import ActionButton from '../button/ActionButton';

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
  return ['To Do', 'In Progress', 'Ready for QA', 'Done'];
}

const StepperStatus = (props) => {
  const { status, handleStatusChange } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(
    status === 'To Do'
      ? 0
      : status === 'In Progress'
      ? 1
      : status === 'Ready for QA'
      ? 2
      : 3
  );
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
    handleStatusChange(
      newActiveStep === 0
        ? 'To Do'
        : newActiveStep === 1
        ? 'In Progress'
        : newActiveStep === 2
        ? 'Ready for QA'
        : 'Done',
      newActiveStep - 1 === 0
        ? 'To Do'
        : newActiveStep - 1 === 1
        ? 'In Progress'
        : newActiveStep - 1 === 2
        ? 'Ready for QA'
        : 'Done'
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleStatusChange(
      activeStep - 1 === 0
        ? 'To Do'
        : activeStep - 1 === 1
        ? 'In Progress'
        : activeStep - 1 === 2
        ? 'Ready for QA'
        : 'Done',
      activeStep === 0
        ? 'To Do'
        : activeStep === 1
        ? 'In Progress'
        : activeStep === 2
        ? 'Ready for QA'
        : 'Done'
    );
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    handleStatusChange(
      step === 0
        ? 'To Do'
        : step === 1
        ? 'In Progress'
        : step === 2
        ? 'Ready for QA'
        : 'Done',
      activeStep === 0
        ? 'To Do'
        : activeStep === 1
        ? 'In Progress'
        : activeStep === 2
        ? 'Ready for QA'
        : 'Done'
    );
  };

  const handleReset = () => {
    setActiveStep(0);
    handleStatusChange('To Do', 'Done');
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <label className='issue__status--heading' htmlFor='issue__status'>
        STATUS
      </label>
      <Stepper
        id='issue__status'
        alternativeLabel
        nonLinear
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              {...stepProps}
              disabled={props.disabled && props.disabled === true}
            >
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div
            style={{ textAlign: 'center' }}
            hidden={props.disabled && props.disabled === true}
          >
            <ActionButton
              disabled={activeStep === 0}
              btnName='Back'
              clickHandler={handleBack}
            />
            <ActionButton
              disabled={activeStep === 3}
              btnName='Next'
              clickHandler={handleNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StepperStatus;
