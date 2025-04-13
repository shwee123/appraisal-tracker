import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Avatar,
  TextField,
  Card,
  CardContent
} from '@mui/material';
import { useForm } from 'react-hook-form';

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, setValue } = useForm();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    axios.get(`/users/${userId}`)
      .then(res => {
        const userData = res.data.data;
        setUser(userData);
        Object.keys(userData).forEach(key => {
          setValue(key, userData[key]);
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, [setValue]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom align="center">
        🧑‍💼 User Profile
      </Typography>

      <Card elevation={4} sx={{ maxWidth: 900, margin: "auto", p: 3, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 30 }}>
            {user.firstName?.[0]}{user.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
        </Box>

        <CardContent>
          <Grid container spacing={2}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "Contact", name: "contact" },
              { label: "Joining Date", name: "joiningDate" },
              { label: "Last Company", name: "lastCompnayName" },
              { label: "Last Salary", name: "lastSalary" },
              { label: "Current Salary", name: "currentSalary" },
              { label: "Department", name: "department" },
              { label: "Designation", name: "designation" },
              { label: "Total Experience", name: "totalExp" }
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  label={label}
                  fullWidth
                  variant="outlined"
                  {...register(name)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
