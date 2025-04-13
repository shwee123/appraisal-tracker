import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box, Button, Grid, MenuItem, Select, TextField, Typography,
  InputLabel, FormControl, Card, CardContent, Snackbar, Alert
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const departments = ["DEVELOPMENT", "MARKETING", "FINANCE", "HR", "IT", "PRODUCTION", "DELIVERY"];
const designations = [
  "JR DEVELOPER", "SR DEVELOPER", "TESTER", "JR HR", "SR HR", "MANAGER",
  "SUPERVISER", "TL", "MARKETING HEAD", "DELIVERY HEAD", "DIRECTOR"
];

const roles = [
  { value: '67f5268b89a910ba5637bef9', label: 'Admin' },
  { value: '67f526a389a910ba5637befd', label: 'Employee' },
  { value: '67f5269989a910ba5637befb', label: 'HR' },
];



const AddEmployee = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      password: '12345678', // Auto-set default password
      role:"67f526a389a910ba5637befd"
    };

    try {
      const response = await axios.post('/users/', payload);
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      navigate("")
    } catch (error) {
        console.log(error)
      const errMsg = error.response?.data?.message || "Something went wrong";
      setSnackbar({ open: true, message: errMsg, severity: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <Card elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            Add New Employee
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="First Name" fullWidth {...register('firstName', { required: "Required" })} error={!!errors.firstName} helperText={errors.firstName?.message} />
            <TextField label="Last Name" fullWidth {...register('lastName', { required: "Required" })} error={!!errors.lastName} helperText={errors.lastName?.message} />
            <TextField label="Email" type="email" fullWidth {...register('email', { required: "Required" })} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Total Exp" fullWidth {...register('totalExp', { required: "Required" })} error={!!errors.totalExp} helperText={errors.totalExp?.message} />
            
            <TextField label="Contact" fullWidth {...register('contact')} />

            {/* <FormControl fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select defaultValue="" label="Role" {...register('role', { required: 'Role is required' })}>
                {roles.map(role => <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>)}
              </Select>
            </FormControl> */}

            <TextField label="Joining Date (DD/MM/YYYY)" fullWidth {...register('joiningDate')} />
            <TextField label="Last Company Name" fullWidth {...register('lastCompnayName')} />
            <TextField label="Last Salary" type="number" fullWidth {...register('lastSalary')} />
            <TextField label="Current Salary" type="number" fullWidth {...register('currentSalary')} />

            <FormControl fullWidth error={!!errors.department}>
              <InputLabel>Department</InputLabel>
              <Select defaultValue="" label="Department" {...register('department', { required: 'Department is required' })}>
                {departments.map(dep => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl fullWidth error={!!errors.designation}>
              <InputLabel>Designation</InputLabel>
              <Select defaultValue="" label="Designation" {...register('designation', { required: 'Designation is required' })}>
                {designations.map(des => <MenuItem key={des} value={des}>{des}</MenuItem>)}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5 }}>
              Add Employee
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEmployee;
