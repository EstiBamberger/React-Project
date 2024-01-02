import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneIcon from '@mui/icons-material/Phone';
import DetailsIcon from '@mui/icons-material/Details';
import ServicesStore from '../../store/ServicesStore';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    direction:'rtl',
    position: 'fixed',
    right: 100,
    top:145,
    width:360,
  },
}));

const BusinessDetails = observer(() => {
  const classes = useStyles();



  return (
    <List className={classes.root}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <BusinessCenterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ServicesStore.details.name} secondary="שם העסק" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PermIdentityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ServicesStore.details.owner} secondary="בעל העסק" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <BusinessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ServicesStore.details.address} secondary="כתובת" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ServicesStore.details.phone} secondary="טלפון" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DetailsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ServicesStore.details.description} secondary="פרטים נוספים" />
      </ListItem>
    </List>
  );
})
export default BusinessDetails