import { Box, Grid, IconButton, Menu, MenuItem, Button, useTheme } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Brightness4, Brightness7, ArrowDropDown } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import menuItems from '../../constants/HrmenuItems';

const HrHeader = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ThemeContext);
  const navigate = useNavigate();

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

  const logoutHandler = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 2,
        zIndex: 10,
        px: 2,
        py: 1,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 20 }}>
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
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                      textTransform: 'none',
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
                    textDecoration: 'none',
                    color: isActive ? theme.palette.primary.main : 'inherit',
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
            <IconButton onClick={logoutHandler} color="inherit">
              Logout
            </IconButton>
          </Box>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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

export default HrHeader;
