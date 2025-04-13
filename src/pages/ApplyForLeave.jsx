import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, MenuItem, Button, Box, Typography, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const ApplyForLeave = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [leaveData, setLeaveData] = useState([]);

  const employeeId = localStorage.getItem('id');

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(`/leave/leavebyuserid/${employeeId}`);
      setLeaveData(response.data || []);
    } catch (error) {
      console.error('Failed to fetch leave data:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/leave/submit', {
        employeeId,
        ...data,
      });
      alert('Leave request submitted successfully');
      reset();
      fetchLeaveData(); // Refresh the leave list after new leave added
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'leaveType', headerName: 'Type', width: 100 },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    { field: 'endDate', headerName: 'End Date', width: 120 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const rows = leaveData.map((leave, index) => ({
    id: index + 1,
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    reason: leave.reason,
    status: leave.status || 'Pending', // fallback status
  }));

  return (
    <Grid container spacing={4} sx={{ mt: 5, px: 3 }}>
      {/* Left - Apply for Leave */}
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h4" gutterBottom>
            Apply for Leave
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="leaveType"
              control={control}
              defaultValue=""
              rules={{ required: 'Leave type is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Leave Type"
                  fullWidth
                  margin="normal"
                  error={!!errors.leaveType}
                  helperText={errors.leaveType?.message}
                >
                  <MenuItem value="sick">Sick</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{ required: 'Start date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{ required: 'End date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="End Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              rules={{ required: 'Reason is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Reason"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!errors.reason}
                  helperText={errors.reason?.message}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit Leave Request
            </Button>
          </form>
        </Box>
      </Grid>

      {/* Right - Display Leaves */}
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          Your Leave Requests
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ApplyForLeave;
