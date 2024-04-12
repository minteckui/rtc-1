import { useState } from "react";
import {
  styled,
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  Switch,
  ListItem,
  ListItemText,
  Button,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { Menu, ChevronLeft, Videocam } from "@mui/icons-material";
import CameraPlayerList from "./CameraPlayerList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingInline: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function IPCamera() {
  const [open, setOpen] = useState(false);
  const [selectedCam, setSelectedCam] = useState([]);

  const items = [
    {
      id: 1,
      title: "Cam-1",
      location: "Store Room",
      url: "http://example.com",
    },
    { id: 2, title: "Cam-2", location: "Lobby", url: "http://example.com" },
    { id: 3, title: "Cam-3", location: "A Room", url: "http://example.com" },
    { id: 4, title: "Cam-4", location: "B Room", url: "http://example.com" },
    { id: 5, title: "Cam-5", location: "13B", url: "http://example.com" },
    { id: 6, title: "Cam-6", location: "45A", url: "http://example.com" },
    { id: 7, title: "Cam-7", location: "874We", url: "http://example.com" },
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
    <Box sx={{ display: "flex", alignItems: "flex-start", height: "100%" }}>
      <DrawerHeader>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ ml: 2, ...(open && { display: "none" }) }}
        >
          <Menu />
        </IconButton>
      </DrawerHeader>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Button
            variant="outlined"
            startIcon={<ChevronLeft />}
            onClick={handleDrawerClose}
          >
            Close
          </Button>
        </DrawerHeader>
        <Divider />
        <List dense style={{ width: "100%" }}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              style={{ borderBottom: "1px solid #ffffff1f", paddingBlock: 0 }}
            >
              <ListItemIcon style={{ minWidth: 36 }}>
                <Videocam color="info" />
              </ListItemIcon>
              <ListItemText
                style={{ paddingBlock: 0 }}
                primary={
                  <Typography variant="subtitle1" color="salmon">
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="primary">
                    {item.location}
                  </Typography>
                }
              />
              <Switch
                size="small"
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
