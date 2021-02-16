import React, { useState, useCallback } from 'react';
// material ui
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from '../UIkit';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/users/operations';

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 256,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 32,
    },
  })
);

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const [Keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  // const { container } = props;

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (e, path) => {
    dispatch(push(path));
    props.onClose(e);
  };

  const menus = [
    { func: selectMenu, label: 'Product register', icon: <AddCircleIcon />, id: 'register', value: '/product/edit' },
    { func: selectMenu, label: 'Product history', icon: <HistoryIcon />, id: 'history', value: '/order/history' },
    { func: selectMenu, label: 'Profile', icon: <PersonIcon />, id: 'profile', value: '/user/mypage' },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        // container={container}
        variant='temporary' // close and open
        anchor='right'
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }} // better performance
      >
        <div>
          <div className={classes.searchField}>
            <TextInput
              fullName={false}
              label={'Keyword input'}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={Keyword}
              type='text'
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key='logout' onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
