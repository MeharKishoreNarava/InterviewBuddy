import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// src/components/AdminLayout.js (FIXED)
import { Home, Group } from '@mui/icons-material';
// Remove Settings, since it's not used in the JSX below.

const drawerWidth = 240;

const AdminLayout = ({ children, title }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            LOGO
          </Typography>
          {/* Add user menu/profile icon here */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* To push the content below the AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected> {/* Highlighted item for 'Manage Organizations' */}
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="Manage Organizations" />
            </ListItem> {/* FIX APPLIED HERE: Replaced </ListIte**m> with </ListItem> */}
            {/* Add more nav items */}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}> {/* pt: 8 accounts for AppBar height */}
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;