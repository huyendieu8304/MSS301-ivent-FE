import {Link, Outlet} from "react-router";
import {
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import {
    Box,
    Divider, Drawer,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import List from '@mui/material/List';
import React, {useState, Fragment} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AvatarMenu from "../component/AvatarMenu.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
const drawerWidth = 240;

const AdminLayout = () => {
  const [pageTitle, setPageTitle] = useState("Trang quản trị viên");
  const { authorities } = useAuth();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: "100dvh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "8.5vh" }}
        >
          <Toolbar sx={{ height: "100%", minHeight: "0 !important" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: 'Comfortaa', fontWeight: 700 }}
              >
                {pageTitle}
              </Typography>
              {authorities && (
                <AvatarMenu setIsLoading={setIsLoading} />
              )}
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Stack direction="row" spacing={2} sx={{ height: "8.5vh", alignItems: "center", justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
                sx={{ color: "#12B76A", fontFamily: 'Comfortaa', fontWeight: 700 }}
              >
                ivent
              </Typography>
            </Link>
          </Stack>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/statistic">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Thống kê" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/account">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Quản lý tài khoản" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/create-admin-account">
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary="Tạo tài khoản quản trị viên" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/users-ban-list">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Danh sách người dùng" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: theme.palette.backgroundColor.main,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar sx={{ height: "8.5vh", minHeight: "0 !important" }} />
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <Box sx={{ padding: 3 }}>
              <Outlet context={{ setPageTitle }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {isLoading && <LoadingComponent />}
    </>
  );
};

export default AdminLayout;
