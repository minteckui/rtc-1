import { useState } from 'react';
import { styled,  Box, Drawer, List, Divider, IconButton, Switch, ListItem, ListItemText } from '@mui/material';
import { Menu, ChevronLeft } from '@mui/icons-material';
import CameraPlayerList from './CameraPlayerList';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    paddingInline: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function IPCamera() {
  const [open, setOpen] = useState(false);
  const [selectedCam, setSelectedCam] = useState([]);

  const items = [
    { id: 1, primary: 'Cam-1', secondary: 'Store Room' },
    { id: 2, primary: 'Cam-2', secondary: 'Lobby' },
    { id: 3, primary: 'Cam-3', secondary: 'A Room' },
    { id: 4, primary: 'Cam-4', secondary: 'B Room' },
    { id: 5, primary: 'Cam-5', secondary: '13B' },
    { id: 6, primary: 'Cam-6', secondary: '45A' },
    { id: 7, primary: 'Cam-7', secondary: '874We' },
  ];

  const handleToggle = (value) => () => {
    const currentIndex = selectedCam.indexOf(value);
    const newChecked = [...selectedCam];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedCam(newChecked);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex',alignItems:'flex-start',height:'100%' }}>
      <DrawerHeader>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ ml: 2, ...(open && { display: 'none' }) }}
        >
          <Menu />
        </IconButton>
      </DrawerHeader>


      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List dense style={{ width: '100%' }}>
          {items.map((item) => (
            <ListItem key={item.id} style={{ borderBottom: '1px solid lightgrey', paddingBlock: 0 }}>
              <ListItemText id={`switch-list-label-${item.id}`} primary={item.primary} secondary={item.secondary} />
              <Switch
                edge="end"
                onChange={handleToggle(item.id)}
                checked={selectedCam.indexOf(item.id) !== -1}
              />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Main open={open}>
        <CameraPlayerList selectedCam={selectedCam} />
      </Main>
    </Box>
  );
}

