import AStore from "../../store/AStore"
import BusinessDetails from '../buisessDetails/BusinessDetails'
import BusinessDetailsToEdit from '../buisessDetails/BusinessDetailsToEdit'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { observer } from "mobx-react"
import { Outlet, Link } from "react-router-dom"
import './AdminHomePage.css'


const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  buttons:{
   display:'flex',
  position:'fixed',
  transform: 'scale(1.2)',
  left:50,
  top:100,
  },
  child:{
    position:'absolute',
    top:70,
    left:40,
    height:20,
  },
  edit:{
    position:'fixed',
    right: 100,
    top:550,
  },
}));

const AdminHomePage = (observer(()=> {


  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    AStore.setIsEdit(!AStore.isEdit);
  };
  

    return (
      <>
      
      <div >
        <div className='details'>
      {!AStore.isEdit ?
      <BusinessDetails />
       :
      <BusinessDetailsToEdit />
      }</div>
      <div className="e">
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange}/>}
        label="edit"
        className={classes.edit}
      />
    </div>
    <div className={classes.buttons}>
    <Link to="./meetings" >  
    <Button variant="outlined" color="primary" style={{borderColor:'#00bfa5',color:'#212121',}}>
      יומן פגישות
    </Button></Link>
    
    <div style={{ margin: '15px' }}></div>
    <Link to="./ser" >
    <Button variant="outlined" color="secondary" style={{borderColor:'#00bfa5',color:'#212121',}}>
      רשימת שירותים
    </Button></Link>
    </div>
    <div className={classes.child}><Outlet /></div>
    
    </div>
      </>
    )
  }))
  
  export default AdminHomePage