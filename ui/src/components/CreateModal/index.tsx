import { Modal, Box, Typography, Stepper, Step, StepLabel, Grid,FormControl, InputLabel, OutlinedInput, Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useState } from "react";

interface ICreateModalProps {
  isOpen: boolean;
  submitForm: (form: IClient) => void;
  handleClose?: () => void;
}

const style = {
  'backgroundColor': 'white',
  'margin': 'auto',
  'width': 400,
  'padding': '10px',
  'borderRadius': '4px'
};

function CreateModal({
  isOpen = false,
  submitForm,
  handleClose
}: ICreateModalProps) {

  const [activeStep, setActiveStep] = useState(0);
  const [clientForm, setClientForm] = useState<IClient>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [stepOneError, setStepOneError] = useState(false);

  const checkStepOne = useCallback(() => {
    if (!clientForm.firstName || !clientForm.lastName) {
      setStepOneError(true);
    } else {
      setActiveStep(activeStep + 1);
      setStepOneError(false);
    }
  }, [clientForm]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ 'display': 'flex' }}
    >
      <Box sx={style}>
        <Grid container justifyContent="space-between" alignItems="center" style={{ 'padding': '10px' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new client
          </Typography>
          <IconButton aria-label="Close modal" component="label" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Stepper activeStep={activeStep}>
          <Step key={0} completed={!!clientForm.firstName && !!clientForm.lastName && !stepOneError}>
            <StepLabel error={stepOneError}> Personal Details </StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel> Contact Details </StepLabel>
          </Step>
        </Stepper>
        {
          activeStep === 0 && (
            <Grid container direction="column" rowSpacing={{ sm: 1 }} style={{ 'padding': '10px' }}>
              <Grid item xs={12}>
                <InputLabel htmlFor="firstName">
                  First Name
                </InputLabel>
                <FormControl variant="outlined" size="small" fullWidth>
                  <OutlinedInput
                    id="firstName"
                    required
                    onChange={(event) => {
                      setClientForm((prev) => ({ ...prev, firstName: event.target.value }))
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="lastName">
                  Last Name
                </InputLabel>
                <FormControl variant="outlined" size="small" fullWidth>
                  <OutlinedInput
                    id="lastName"
                    required
                    onChange={(event) => {
                      setClientForm((prev) => ({ ...prev, lastName: event.target.value }))
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item style={{ 'display': 'flex', 'flexDirection': 'row-reverse', 'marginTop': '50px' }}>
                <Button variant="contained" style={{ 'textTransform': 'capitalize' }} onClick={() => checkStepOne()}>Continue</Button>
              </Grid>
            </Grid>
          )
        }
        {
          activeStep === 1 && (
            <Grid container direction="column" rowSpacing={{ sm: 1 }} style={{ 'padding': '10px' }}>
              <Grid item xs={12}>
                <InputLabel htmlFor="email">
                  Email
                </InputLabel>
                <FormControl variant="outlined" size="small" fullWidth>
                  <OutlinedInput
                    id="email"
                    type="email"
                    required
                    onChange={(event) => {
                      setClientForm((prev) => ({ ...prev, email: event.target.value }))
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="phoneNumber">
                  Phone Number
                </InputLabel>
                <FormControl variant="outlined" size="small" fullWidth>
                  <OutlinedInput
                    id="phoneNumber"
                    required
                    onChange={(event) => {
                      setClientForm((prev) => ({ ...prev, phoneNumber: event.target.value }))
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginTop': '50px'  }}>
                <Button variant="text"
                  style={{ 'textTransform': 'capitalize' }}
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
                <Button variant="contained"
                  style={{ 'textTransform': 'capitalize' }}
                  disabled={!clientForm.email || !clientForm.phoneNumber}
                  onClick={() => submitForm(clientForm)}>Create client</Button>
              </Grid>
            </Grid>
          )
        }
      </Box>
    </Modal>
  );
}

export default CreateModal;
