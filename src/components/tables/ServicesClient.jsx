import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddMeeting from '../addMeeting/AddMeeting'
import ServicesStore from '../../store/ServicesStore';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
paper:{
  border:"2px solid "+"#00bfa5",
},
h:{
color:'#9e9e9e',
},
}));


const emails = ['username@gmail.com', 'user02@gmail.com'];

const ServicesClient = observer(() => {

  const classes = useStyles();
  const [orderData={
    identity:"#12123",
    type:'',
    username:'',
    address:'',
    phone:'',
    email:'',
    deliveryDate:'',
}, setOrderData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

     SimpleDialog.propTypes = {
      onClose: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired,
      selectedValue: PropTypes.string.isRequired,
    };

     const handleChangeOrder = e => {
      setOrderData[e.target.name] = e.target.value;
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    function SimpleDialog(props) {
      const { onClose, selectedValue, open } = props;
    
      const handleClose = () => {
        onClose(selectedValue);
      };
    
      const handleListItemClick = (value) => {
        onClose(value);
      };
    
      return (
        <Dialog onClose={handleClose} open={open}>
          <AddMeeting handleChangeOrder={handleChangeOrder}></AddMeeting>
          <Button onClick={()=>{
            ServicesStore.postOrders(setOrderData);
          }} style={{backgroundColor:'black', color:'#00bfa5',height:'30'}}>סיום הזמנה</Button>
        </Dialog>
      );
    }
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
  return (
    <>
     <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{borderColor:'#00bfa5',color:'#00bfa5',}}>
        הזמנת נסיעה / שירות
      </Button>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: 300,
          borderRadius:2,
        },
      }}
    >
     {ServicesStore.services.map((item, index) => (
        <Paper className={classes.paper} elevation={3}>
          <p className={classes.h}>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </Paper>
      ))}
    </Box></>
  );
})
export default ServicesClient