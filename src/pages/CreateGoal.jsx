import React from 'react';
import {
  Grid, TextField, Button, Typography, MenuItem, Box, Paper
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import goalImg from '../assets/images/goal.jpg'; // Replace with your image path
import { useNavigate } from 'react-router-dom';

const goalTypes = [
  "Certification", "Team mentoring", "Upgrade New Tech", 
  "Blog Writting", "Interview Taking", "Help in Marketing", "Refer New Employee"
];

export const CreateGoal = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      const payload = { ...data, user: userId };
      const response = await axios.post("/empGoal/create", payload);
      alert("Goal created successfully!");
      reset();
      if(response.status===201){
        navigate("/empgoallist")
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', minHeight: '500px' }}>
      <Grid container>
        {/* Left: Image */}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: `url(${goalImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' }
        }} />

        {/* Right: Form */}
        <Grid item xs={12} md={6} p={4}>
          <Typography variant="h5" mb={3}>🎯 Create New Goal</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Goal type is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Goal Type"
                      fullWidth
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      {goalTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="pending"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Status"
                      fullWidth
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
                  🚀 Submit Goal
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};
