import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { AddBox, Search } from "@mui/icons-material";
import { useAuth } from "@/app/context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout"; // Importe o ícone de logout

const drawerWidth = 240;

export default function SideMenu({ activeMenu, setActiveMenu }) {
  const { user, logout } = useAuth();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          flexGrow: 1,
        }}
      >
        <Avatar>{initials}</Avatar>
        <Typography variant="h6" style={{ margin: "10px 0" }}>
          {user?.name}
        </Typography>

        <List>
          {(user?.profile === "client" || user?.profile === "admin") && (
            <>
              <ListItemButton
                selected={activeMenu === "request"}
                onClick={() => handleMenuClick("request")}
              >
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="Solicitar Emissão" />
              </ListItemButton>

              <ListItemButton
                selected={activeMenu === "search"}
                onClick={() => handleMenuClick("search")}
              >
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Buscar Solicitações" />
              </ListItemButton>
            </>
          )}
          {user?.profile === "operator" && (
            <ListItemButton
              selected={activeMenu === "search"}
              onClick={() => handleMenuClick("search")}
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Buscar Solicitações" />
            </ListItemButton>
          )}
        </List>
      </div>
      <Divider />

      <Box>
        <List>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
