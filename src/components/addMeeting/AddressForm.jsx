import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ServicesStore from '../../store/ServicesStore';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const AddressForm=(observer((props)=>{
  const [type, setType] = React.useState('');
  const classes = useStyles();
  const handleChangeOrder=props.handleChangeOrder;
  const handleChange = (event) => {
    setType(event.target.value);
    handleChangeOrder(event);
  };
  const handleDateTimeChange = (dateTime) => {
    const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss');
    let obj={
      target:{
        value:formattedDateTime,
        name:"deliveryDate"
      }
    }
    handleChangeOrder(obj)};

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        השלמת הזמנה
      </Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
      <FormControl variant="standard" sx={{ minWidth: 220 }}>
        <InputLabel id="demo-simple-select-standard-label">סוג השירות</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChange}
          required
          name="type"
          autoComplete="given-name"
          variant="standard"
          fullWidth
        >
            {ServicesStore.services.map((service, index) => (
                <MenuItem key={index} value={service.name}>
                  {service.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="username"
            label="שם"
            autoComplete="given-name"
            variant="standard"
            fullWidth
            onChange={(e)=>{
              handleChangeOrder(e);
          }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="כתובת"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e)=>{
              handleChangeOrder(e);
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phon"
            name="phone"
            label="טלפון"
            variant="standard"
            fullWidth
            onChange={(e)=>{
              handleChangeOrder(e);
          }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="מועד נסיעה"  onChange={handleDateTimeChange}/>
      </DemoContainer>
    </LocalizationProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}))
export default AddressForm