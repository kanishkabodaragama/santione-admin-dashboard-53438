import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  ThemeProvider,
  createTheme,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Slide,
  useMediaQuery,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  ReportProblem as ReportProblemIcon,
  DevicesOther as DevicesOtherIcon,
  Videocam as VideocamIcon,
  LocalParking as LocalParkingIcon,
  ChevronLeft,
  Add as AddIcon,
  Sync as SyncIcon,
  Search as SearchIcon,
  FileUpload as FileUploadIcon,
  Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ExpandLess,
  ExpandMore,
  ExitToApp
} from "@mui/icons-material";
import logo from "./logo.svg";

const drawerWidth = 240;

// Menu items definition
const sidebarItems = [
  { key: "portfolio", label: "Portfolio", icon: <HomeIcon /> },
  { key: "bookings", label: "Bookings", icon: <EventIcon /> },
  { key: "tasks", label: "Tasks", icon: <CheckCircleIcon /> },
  { key: "revenue", label: "Revenue", icon: <MonetizationOnIcon /> },
  { key: "issues", label: "Issues", icon: <ReportProblemIcon /> },
  { key: "devices", label: "Smart Devices", icon: <DevicesOtherIcon /> },
  { key: "cameras", label: "Cameras", icon: <VideocamIcon /> },
  { key: "parking", label: "Parking", icon: <LocalParkingIcon /> }
];

function QuickActionPanel({onQuickAction}) {
  // Modern quick actions using MUI FloatingActionButton pattern
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 38 },
        right: { xs: 16, md: 38 },
        zIndex: (theme) => theme.zIndex.drawer + 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      <Tooltip title="Add Property" arrow>
        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ borderRadius: "999px", boxShadow: 4 }}
          onClick={() => onQuickAction("add-property")}
          startIcon={<AddIcon />}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>Add Property</Box>
        </Button>
      </Tooltip>
      <Tooltip title="OTA Sync" arrow>
        <Button
          size="large"
          color="secondary"
          sx={{ borderRadius: "999px", background: "linear-gradient(90deg, #00BFA5 60%, #1976D2 90%)", color: "#fff", boxShadow: 4 }}
          onClick={() => onQuickAction("ota-sync")}
          startIcon={<SyncIcon />}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>OTA Sync</Box>
        </Button>
      </Tooltip>
      <Tooltip title="Export Report" arrow>
        <Button
          size="large"
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #FFA726 60%, #1976D2 90%)",
            color: "#fff", borderRadius: "999px", boxShadow: 4
          }}
          onClick={() => onQuickAction("export")}
          startIcon={<FileUploadIcon />}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>Export</Box>
        </Button>
      </Tooltip>
      <Tooltip title="Search" arrow>
        <Button
          size="large"
          color="info"
          variant="outlined"
          onClick={() => onQuickAction("search")}
          startIcon={<SearchIcon />}
          sx={{ borderRadius: "999px", borderWidth: 2, background: "#fff", boxShadow: 4 }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>Search</Box>
        </Button>
      </Tooltip>
    </Box>
  );
}

function UserMenuDropdown({ onLogout }) {
  // Modernized user avatar & dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        startIcon={
          <Avatar sx={{ bgcolor: "#FFA726", color: "#1976D2", width: 36, height: 36, fontWeight: "bold" }}>
            AB
          </Avatar>
        }
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          textTransform: "none",
          pl: 0,
          pr: 1,
          bgcolor: open ? "action.selected" : undefined,
          color: "text.primary"
        }}
      >
        <Box sx={{ display: { xs: "none", md: "inline" } }}>Admin</Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
        slotProps={{ paper: { sx: { minWidth: 180, mt: 1 } } }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}
        >
          <ExitToApp fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

function KPITrend({ type, value }) {
  // Up or down trend badge with color
  return (
    <Box sx={{
      mt: 0.5,
      fontWeight: 600,
      color: type === "up" ? "success.main" : "error.main",
      display: "flex", alignItems: "center", gap: 0.5
    }}>
      {type === "up" ? "▲" : "▼"} {value}%
    </Box>
  );
}

function KpiCard({ title, value, unit, icon, trend }) {
  // Animated mount for KPI
  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Card variant="outlined" sx={{
        borderRadius: 3, minWidth: 0, height: 108,
        display: "flex", alignItems: "center", gap: 2, px: 2, boxShadow: 2,
        ":hover": { boxShadow: 5, transform: "translateY(-3px) scale(1.025)", transition: "all .27s cubic-bezier(.33,1.7,.59,.73)" }
      }}>
        <CardHeader
          avatar={
            <Box sx={{
              bgcolor: "secondary.main", color: "primary.main",
              borderRadius: 2, p: 1.25, fontSize: 26, minWidth: 44, minHeight: 44, display: "flex", justifyContent: "center", alignItems: "center"
            }}>
              {icon}
            </Box>
          }
          title={<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{title}</Typography>}
          subheader={
            <Box sx={{ fontSize: "1.6rem", fontWeight: 800, color: "primary.main", lineHeight: 1.05 }}>
              {value}
              {unit && <Typography component="span" variant="subtitle2" color="secondary" fontWeight={400} ml={0.5}>{unit}</Typography>}
              {trend && <KPITrend type={trend.type} value={trend.value} />}
            </Box>
          }
          sx={{ p: 0, pr: 1.2, flex: 1, ".MuiCardHeader-title": { mb: 0.3 }, ".MuiCardHeader-subheader": { mb: 0 } }}
        />
      </Card>
    </Slide>
  );
}

function SimpleBarChart({ percent, label }) {
  // Animated progress bar
  return (
    <Fade in>
      <Box sx={{ width: "100%", mt: 0.5 }}>
        <Box sx={{ width: "100%", height: 21, bgcolor: "grey.100", borderRadius: 2, overflow: "hidden", mb: 0.75 }}>
          <Box sx={{
            height: "100%",
            bgcolor: "linear-gradient(90deg, #1976D2 72%, #FFA726 94%)",
            background: "linear-gradient(90deg, #1976D2 60%, #FFA726 94%)",
            width: `${percent}%`,
            transition: "width 1s cubic-bezier(.5,2,.6,.95)",
          }} />
        </Box>
        <Typography variant="subtitle2" fontWeight={600} color="primary">{label}</Typography>
      </Box>
    </Fade>
  );
}

function KpiWidgetGrid() {
  // Example mock KPI and chart data
  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ px: { xs: 1, md: 4 }, py: 3, mt: 0 }}>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Managed Properties" value="8" icon={<HomeIcon fontSize="large" />} trend={{ type: "up", value: 4 }} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Total Bookings (week)" value="36" icon={<EventIcon fontSize="large" />} trend={{ type: "down", value: 3 }} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Active Tasks" value="12" icon={<CheckCircleIcon fontSize="large" />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Revenue (YTD)" value="€23,590" icon={<MonetizationOnIcon fontSize="large" />} trend={{ type: "up", value: 14 }} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Open Issues" value="3" icon={<ReportProblemIcon fontSize="large" />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Online Devices" value="21/22" icon={<DevicesOtherIcon fontSize="large" />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Cameras Online" value="5/5" icon={<VideocamIcon fontSize="large" />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><KpiCard title="Parking Avail." value="9" unit="/18" icon={<LocalParkingIcon fontSize="large" />} /></Grid>
      {/* Chart widgets */}
      <Grid item xs={12} sm={4}>
        <Card variant="outlined" sx={{ borderRadius: 3, minWidth: 0, boxShadow: 1, px: 1, py: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#00BFA5" gutterBottom>
            Occupancy Rate
          </Typography>
          <SimpleBarChart percent={78} label="78%" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined" sx={{ borderRadius: 3, minWidth: 0, boxShadow: 1, px: 1, py: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#1976D2" gutterBottom>
            Booking Sync Health
          </Typography>
          <SimpleBarChart percent={97} label="97%" />
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined" sx={{ borderRadius: 3, minWidth: 0, boxShadow: 1, px: 1, py: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#FFA726" gutterBottom>
            Avg. Staff Task Completion
          </Typography>
          <SimpleBarChart percent={86} label="86%" />
        </Card>
      </Grid>
    </Grid>
  );
}

// PUBLIC_INTERFACE
export default function DashboardLayout() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickActionDialog, setQuickActionDialog] = useState({ open: false, action: "" });
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function handleQuickAction(action) {
    setQuickActionDialog({ open: true, action });
  }

  function handleLogout() {
    alert("Logging out...");
    // Future: Integrate actual logout logic
  }

  // Color theme (from backend/container details)
  const brandTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976D2" },
      secondary: { main: "#00BFA5" },
      accent: { main: "#FFA726" },
      background: { default: "#fafbfc", paper: "#fff" }
    },
    typography: {
      fontFamily: ['"Segoe UI"', '"Roboto"', '"Helvetica Neue"', "Arial", "sans-serif"].join(",")
    }
  });

  // Sidebar contents
  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2.5, mt: 1 }}>
        <Avatar
          src={logo}
          alt="Santione"
          sx={{ width: 46, height: 46, bgcolor: "#fff", boxShadow: 2, borderRadius: 2 }}
          variant="rounded"
        />
      </Box>
      <Divider sx={{ mb: 1.2 }} />
      <List sx={{ flex: 1 }}>
        {sidebarItems.map((item, idx) => (
          <ListItem button key={item.key} sx={{
            px: 3, py: 1, borderRadius: 2,
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              transform: "scale(1.03) translateX(4px)",
              transition: "all 0.17s cubic-bezier(.21,1.13,.75,.91)"
            },
            mb: idx !== sidebarItems.length - 1 ? 0.6 : 0
          }}>
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ "& .MuiListItemText-primary": { fontWeight: 600, fontSize: 17, letterSpacing: -0.5, ml: 0.5 } }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 0 }}>
        <Button
          fullWidth
          sx={{
            my: 2, py: 1,
            textTransform: "none",
            color: "#fff",
            bgcolor: "primary.main",
            borderRadius: 2,
            fontWeight: 600,
            ":hover": { bgcolor: "secondary.main" }
          }}
          startIcon={<AddIcon />}
        >
          Add Property
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={brandTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Sidebar drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          variant={isMobile ? "temporary" : "permanent"}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{
            sx: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "primary.main",
              color: "#fff",
              borderRight: "none",
              boxShadow: 8
            }
          }}
        >
          {drawerContent}
        </Drawer>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Top AppBar */}
          <AppBar
            elevation={2}
            position="sticky"
            sx={{
              bgcolor: "#fff",
              color: "primary.main",
              px: { xs: 1, md: 3 },
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
          >
            <Toolbar sx={{ display: "flex", alignItems: "center", minHeight: "64px !important", px: 0 }}>
              <IconButton
                color="primary"
                edge="start"
                aria-label="open drawer"
                onClick={() => setSidebarOpen((open) => !open)}
                sx={{ mr: 2, display: { md: "none" }, border: "1.5px solid #E3EDF8", bgcolor: "#f5faff", borderRadius: 2 }}
              >
                {sidebarOpen ? <ChevronLeft /> : <MenuIcon />}
              </IconButton>
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Avatar src={logo} sx={{ width: 36, height: 36, bgcolor: "secondary.main" }} />
              </Box>
              <Typography variant="h5" fontWeight="bold" color="primary" sx={{ flex: 1, ml: 0, letterSpacing: -1 }}>
                Santione Dashboard
              </Typography>
              <Box sx={{ mr: 2, display: { xs: "none", sm: "flex" }, gap: 2 }}>
                <Button startIcon={<AddIcon />} variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 38, fontWeight: 500, boxShadow: 1 }}>
                  Add Property
                </Button>
                <IconButton color="primary" onClick={() => setNotifOpen(true)}>
                  <NotificationsIcon />
                </IconButton>
              </Box>
              <UserMenuDropdown onLogout={handleLogout} />
            </Toolbar>
          </AppBar>

          {/* Main dashboard area */}
          <Box sx={{ flex: 1, overflowX: "hidden", bgcolor: "background.default", width: "100%" }}>
            <KpiWidgetGrid />
            <QuickActionPanel onQuickAction={handleQuickAction} />
            {/* Notification Snackbar */}
            <Snackbar
              open={notifOpen}
              onClose={() => setNotifOpen(false)}
              autoHideDuration={3000}
              message="No new notifications"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
            {/* Quick Action Dialog */}
            <Dialog open={quickActionDialog.open} onClose={() => setQuickActionDialog({ open: false, action: "" })}>
              <DialogTitle>
                {quickActionDialog.action === "add-property" && "Add New Property"}
                {quickActionDialog.action === "ota-sync" && "OTA Sync"}
                {quickActionDialog.action === "export" && "Export Report"}
                {quickActionDialog.action === "search" && "Search"}
              </DialogTitle>
              <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {quickActionDialog.action === "add-property" && "Add new property functionality is under construction."}
                  {quickActionDialog.action === "ota-sync" && "OTA sync feature coming soon."}
                  {quickActionDialog.action === "export" && "Export feature is not available in the demo."}
                  {quickActionDialog.action === "search" && "Smart search coming soon."}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setQuickActionDialog({ open: false, action: "" })} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* Footer */}
          <Box sx={{
            bgcolor: "#ececec",
            color: "text.secondary",
            p: { xs: 1.2, md: 2 },
            textAlign: "center",
            fontSize: { xs: 13, md: 16 },
            borderTop: "1.5px solid #e0e3ea",
            mt: 6
          }}>
            <Box component="span">Santione Admin • v1.0</Box>
            <Box component="span" ml={2} sx={{ a: { color: "inherit", mx: 0.5, textDecoration: "none" } }}>
              <a href="#">Support</a> | <a href="#">Privacy</a> | <a href="#">Terms</a>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
