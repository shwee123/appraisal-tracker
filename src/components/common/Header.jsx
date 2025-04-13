import {
  Box,
  Grid,
  
  Menu,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, ArrowDropDown } from "@mui/icons-material";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import getMenuItems from "../../constants/menuItems";
import axios from "axios";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const menuItems = getMenuItems(navigate);

  const { toggleColorMode } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const markAttendance = async () => {
    // Retrieve employeeId from localStorage
    const employeeId = localStorage.getItem("id");

    // Check if employeeId exists
    if (!employeeId) {
      console.error("Employee ID not found in localStorage.");
      return;
    }

    // Define the attendance status (e.g., 'present' or 'absent')
    const status = "Present"; // or 'absent' based on your logic

    try {
      // Send POST request to mark attendance
      const response = await axios.post("/empattendance/mark", {
        user: employeeId,
        status,
      });

      // Handle successful response
      console.log("Attendance marked successfully:", response.data);
      alert("Attendance marked successfully")
      
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error marking attendance:", error.response.data);
        alert("you have already mark attendance for today")
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [submenu, setSubmenu] = useState([]);

  const handleMenuClick = (event, children) => {
    setAnchorEl(event.currentTarget);
    setSubmenu(children);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenu([]);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 2,
        zIndex: 10,
        px: 2,
        py: 1,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link
            to="/"
            style={{ textDecoration: "none", fontWeight: "bold", fontSize: 20 }}
          >
            HRMS
          </Link>
        </Grid>
        <Grid item>
          <Box display="flex" gap={2} alignItems="center">
            {menuItems.map((item, index) =>
              item.children ? (
                <Box key={index}>
                  <Button
                    endIcon={<ArrowDropDown />}
                    onClick={(e) => handleMenuClick(e, item.children)}
                    sx={{
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                      textTransform: "none",
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              ) : (
                <NavLink
                  key={index}
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? theme.palette.primary.main : "inherit",
                    fontWeight: 500,
                  })}
                >
                  {item.label}
                </NavLink>
              )
            )}

            {/* <IconButton onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton> */}
            <Tooltip title="Mark Attendance">
              <IconButton onClick={markAttendance} color="success">
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} color="success">
                <LogoutIcon/>
              </IconButton>
            </Tooltip>
            
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {submenu.map((subItem, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  handleClose();
                  navigate(subItem.path);
                }}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
