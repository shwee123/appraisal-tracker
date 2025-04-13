import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import hrms from "../assets/images/hrms.jpg";

const roles = [
  { value: '67f5268b89a910ba5637bef9', label: 'Admin' },
  { value: '67f526a389a910ba5637befd', label: 'Employee' },
  { value: '67f5269989a910ba5637befb', label: 'HR' },
];

const signupFields = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
      return;
    }

    const { confirmPassword, ...payload } = data;

    try {
      const response = await axios.post('/users/', payload); // adjust URL
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      setSnackbar({ open: true, message: errMsg, severity: 'error' });
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Image */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          backgroundImage: `url(${hrms})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
      </Grid>

      {/* Right Side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 3,
          py: 6,
          background: '#f7f9fc',
        }}
      >
        <Card elevation={10} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 480 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
              Create an Account 🚀
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" mb={3}>
              Fill the details to sign up
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {signupFields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  {...register(field.name, {
                    required: field.required && `${field.label} is required`,
                  })}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              ))}

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  defaultValue=""
                  label="Role"
                  {...register('role', { required: 'Role is required' })}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ borderRadius: '8px', py: 1.5, fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
