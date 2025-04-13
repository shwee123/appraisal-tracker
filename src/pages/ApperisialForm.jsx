import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const ApperisialForm = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams(); // employeeId
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const createdBy = localStorage.getItem("id");
      const response = await axios.post('/appricial/create', {
        ...data,
        employeeId: id,
        createdBy
      });
      alert('Appraisal submitted successfully!');
      reset();
      navigate("/")
    } catch (error) {
      console.error('Error submitting appraisal:', error);
      alert('Failed to submit appraisal');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 700, margin: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Employee Appraisal Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {[
            { name: "attendanceRating", label: "Attendance (1-10)" },
            { name: "goalCompletionRating", label: "Goal Completion (1-10)" },
            { name: "disciplineRating", label: "Discipline (1-10)" },
            { name: "communicationRating", label: "Communication (1-10)" },
            { name: "teamworkRating", label: "Teamwork (1-10)" },
            { name: "initiativeRating", label: "Initiative (1-10)" },
            { name: "finalScore", label: "Final Score (1-10)", optional: true },
          ].map(({ name, label, optional }) => (
            <Grid item xs={6} key={name}>
              <Controller
                name={name}
                control={control}
                rules={!optional ? { required: `${label} is required` } : {}}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    type="number"
                    inputProps={{ min: 1, max: 10 }}
                    fullWidth
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                  />
                )}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Controller
              name="overallRemarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Overall Remarks"
                  multiline
                  rows={3}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Submit Appraisal
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
