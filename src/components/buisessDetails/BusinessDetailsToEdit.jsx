import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'; // This line has been changed
import ListItemText from '@material-ui/core/ListItemText'; // This line has been changed
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ServicesStore from '../../store/ServicesStore';
import Button from '@material-ui/core/Button';
import SaveIcon from '@mui/icons-material/Save';

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
  button: {
    margin: theme.spacing(1),
    position:'fixed',
    right: 300,
    top:540,
  },
}));

export default function BusinessDetailsToEdit() {
  const classes = useStyles();
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
      setListItems([
        { primary: ServicesStore.details.name, secondary: 'שם העסק' },
        { primary: ServicesStore.details.owner, secondary: 'בעל העסק' },
        { primary: ServicesStore.details.address, secondary: 'כתובת' },
        { primary: ServicesStore.details.phone, secondary: 'טלפון' },
        { primary: ServicesStore.details.description, secondary: 'פרטים נוספים' },
      ]);
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const handleTextChange = (index, newText) => {
    const updatedListItems = [...listItems];
    updatedListItems[index] = { ...updatedListItems[index], primary: newText };
    setListItems(updatedListItems);
  };
  
  const saveChanges=()=>{
    const requestBody = {
      name: listItems[0].primary,
      id: "123",
      address: listItems[2].primary,
      phone: listItems[3].primary,
      owner: listItems[1].primary,
      logo: "https://coding-academy.org/images/ca_logo.png",
      description: listItems[4].primary,
    };
    ServicesStore.updateDetails(requestBody);
  }
  return (
    <>
    <List className={classes.root}>
      {listItems.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ListAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <input
                  type="text"
                  value={item.primary}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                />
              }
              secondary={item.secondary}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={saveChanges}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{backgroundColor:!isHovered?'#00bfa5':'#009688',}}
      >
        Save
      </Button>
    </>
  );
}