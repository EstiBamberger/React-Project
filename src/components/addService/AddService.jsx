import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ServicesStore from '../../store/ServicesStore';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [ser,setSer]=useState({
    id:"",price:"",name:"",description:"",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{borderColor:'#00bfa5',color:'#212121',}}>
        add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">new service</DialogTitle>
        <DialogContent style={{direction:'rtl',}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="קוד השירות"
            type="text"
            onChange={(e)=>{
                const s={...ser,id:e.target.value};
                setSer(s);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="שם"
            type="text"
            onChange={(e)=>{
                const s={...ser,name:e.target.value};
                setSer(s);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="תיאור"
            type="text"
            onChange={(e)=>{
                const s={...ser,description:e.target.value};
                setSer(s);
            }}
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="מחיר"
            type="text"
            onChange={(e)=>{
                const s={...ser,price:e.target.value};
                setSer(s);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            יציאה
          </Button>
          <Button onClick={()=>
          {ServicesStore.addService(ser);
            ServicesStore.initialServices();
          }} color="primary">
          הוספת השירות
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}