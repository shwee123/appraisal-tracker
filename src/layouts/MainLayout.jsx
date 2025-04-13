import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;