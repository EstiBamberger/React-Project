import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ServicesStore from '../../store/ServicesStore';
import { observer } from "mobx-react"
import AddService from '../addService/AddService'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  all:{
   width:'100vh',
   position:'absolute',
   top:'20vh',
   direction:'rtl',
  },
}));


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const SerList = observer(() => {
  const classes = useStyles();
useEffect(() => {
   ServicesStore.initialServices();
  }, []);

  return (
    <React.Fragment >
      <CssBaseline />
      <Paper square sx={{ pb: '50px' ,overflow:'auto'}} className={classes.all}>
        {/* <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          שירותים
        </Typography> */}
        <List sx={{ mb: 2 }}>
          {ServicesStore.services.map((item) => (
            <React.Fragment >
              <ListItem button >
                {/* <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar> */}
                <ListItemText>{item.name}</ListItemText>
                <ListItemText>{item.price}</ListItemText>
                <ListItemText>{item.describtion}</ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
       <AddService/>
      </Paper>
    </React.Fragment>
  );
})
export default SerList