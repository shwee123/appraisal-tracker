import { useForm } from 'react-hook-form';
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
} from '@mui/material';
import hrms from "../assets/images/hrms.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = async(data) => {
    console.log('Form Submitted:', data);
    const res = await axios.post("/users/login",data)
    localStorage.setItem("id",res.data.data._id)
    const role = res.data.data.role?.name
    console.log(res.data,)
    console.log(role)
    if(role=="EMPLOYEE"){
      navigate("/")
    }
    else if(role=="HR"){
      navigate("/hr")
    }
    else if(role=="ADMIN"){
      navigate("/admin")
    }
    else{
      navigate("/login")
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

      {/* Right Side - Login Form */}
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
        <Card elevation={10} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 420 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
              Welcome Back 👋
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" mb={3}>
              Please login to your account
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <TextField
                label="Email"
                fullWidth
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {/* <FormControl fullWidth error={!!errors.role}>
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
              </FormControl> */}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ borderRadius: '8px', py: 1.5, fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
