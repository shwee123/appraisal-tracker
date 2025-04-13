import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const CreateEmployeeAppriciation = () => {

  const { userId } = useParams(); // employee ID from route
  const hrId = localStorage.getItem('id'); // logged-in HR ID
  const navigate = useNavigate()

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      appreciationType: 'Performance',
      reason: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      user: userId,
      hr: hrId
    };

    try {
      const res = await axios.post('/appriciations/create', payload); // Update endpoint as needed
      console.log('Appreciation Sent:', res.data);
      reset();
      alert('Appreciation sent successfully!');
      navigate("/hr")
      
    } catch (err) {
      console.error('Error sending appreciation:', err);
      alert('Failed to send appreciation');
    }
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          🎉 Send Appreciation
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="appreciationType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Appreciation Type"
                fullWidth
                margin="normal"
              >
                {["Performance", "Teamwork", "Innovation", "Leadership", "Punctuality", "Milestone"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason"
                fullWidth
                margin="normal"
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Appreciation
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
