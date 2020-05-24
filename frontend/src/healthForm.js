import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiAlert from '@material-ui/lab/Alert';

import Countries from './resource/countries.json'
import Snackbar from '@material-ui/core/Snackbar'

const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  lineHeight12: {
    lineHeight: 1.2
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function HealthForm () {
  const classes = useStyles()
  const ValSchema = Yup.object().shape({
    studentId: Yup.string()
      .matches(/^\d{8}[A-Za-z]$/, {message: 'Example: 12345678d'}),
    studentName: Yup.string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    country: Yup.string()
      .required('Required'),
    isSuspected: Yup.string()
      .required('Required'),
    isConfirmed: Yup.string()
      .required('Required'),
    bodyTemperature: Yup.string()
      .matches(/^[34]\d\.\d$/, {message: 'Example: 36.0'}),
  });
  const formik = useFormik({
    initialValues: {
      studentId: '',
      studentName: '',
      country: '',
      isSuspected: '',
      isConfirmed: '',
      bodyTemperature: '',
    },
    onSubmit: values => {
      console.log("Submit")
      axios.post('http://backend-dev22222222.us-east-1.elasticbeanstalk.com/', values)
        .then(function (response) {
          console.log(response);
          setAlertSuccess(true)
          setAlertOpen(true)
          formik.resetForm()
        })
        .catch(function (error) {
          console.log(error);
          setAlertSuccess(false)
          setAlertOpen(true)
        });
    },
    validationSchema: ValSchema,
  })

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);

  const handleAlertClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };


  return (
  <Box my={2}>
    <Box>
      <Typography variant='h4' align='center'>
        COVID-19 Student Health Tracking Form
      </Typography>
    </Box>
    <form onSubmit={formik.handleSubmit}>
      <FormControl className={classes.formControl}>
        <TextField
          name="studentId"
          margin="dense"
          label='Student ID'
          value={formik.values.studentId}
          onChange={formik.handleChange}
          fullWidth
          required
          error={!!(formik.errors.studentId && formik.touched.studentId)}
          helperText={formik.errors.studentId}
          onBlur={formik.handleBlur}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          name="studentName"
          margin="dense"
          label='Student Name'
          value={formik.values.studentName}
          onChange={formik.handleChange}
          fullWidth
          required
          error={!!(formik.errors.studentName && formik.touched.studentName)}
          helperText={formik.errors.studentName}
          onBlur={formik.handleBlur}
        />
      </FormControl>
      <FormControl className={classes.formControl} error={!!(formik.errors.country && formik.touched.country)}>
        <InputLabel id="country-select">Country/Region you are residing in *</InputLabel>
        <Select
          name='country'
          labelId='country-select'
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        >
          {
            Countries.map((item) => {
              return (
                <MenuItem key={item.abbr} value={item.name}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
        <FormHelperText>{formik.errors.country}</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          name="bodyTemperature"
          margin="dense"
          label='Your Current Body Temperature (Celsius)'
          value={formik.values.bodyTemperature}
          onChange={formik.handleChange}
          fullWidth
          required
          error={!!(formik.errors.bodyTemperature && formik.touched.bodyTemperature)}
          helperText={formik.errors.bodyTemperature}
          onBlur={formik.handleBlur}
        />
      </FormControl>
      <Box pt={1}/>
      <FormControl className={classes.formControl} component="fieldset"
                   error={!!(formik.errors.isSuspected && formik.touched.isSuspected)}
                   onBlur={formik.handleBlur}
      >
        <FormLabel className={classes.lineHeight12} component="legend">
          Have you developed symptoms like fever and cough in the past 14 days?
        </FormLabel>
        <FormHelperText>{formik.errors.isSuspected}</FormHelperText>
        <RadioGroup name="isSuspected" value={formik.values.isSuspected} onChange={formik.handleChange}>
          <Box display='flex'>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </Box>
        </RadioGroup>
      </FormControl>
      <FormControl className={classes.formControl} component="fieldset"
                   error={!!(formik.errors.isConfirmed && formik.touched.isConfirmed)}
                   onBlur={formik.handleBlur}
      >
        <FormLabel className={classes.lineHeight12} component="legend">
          Have you been diagnosed with COVID-19 in the past 14 days?
        </FormLabel>
        <FormHelperText>{formik.errors.isConfirmed}</FormHelperText>
        <RadioGroup name="isConfirmed" value={formik.values.isConfirmed} onChange={formik.handleChange}>
          <Box display='flex'>
            <FormControlLabel value="1" control={<Radio />} label="Yes" />
            <FormControlLabel value="0" control={<Radio />} label="No" />
          </Box>
        </RadioGroup>
      </FormControl>
      <Box display="flex" justifyContent='center' mt={4} mb={2}>
        <Button type='submit' variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity={alertSuccess ? 'success' : 'error'}>
        {alertSuccess ? 'Successfully submitted!' : 'An error occurred!'}
      </Alert>
    </Snackbar>
  </Box>

)
}

export default HealthForm;
