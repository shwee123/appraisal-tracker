import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import HrHeader from '../components/hr/HrHeader';

const HrLayout = () => {
  return (
    <Box>
      <HrHeader />
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HrLayout;