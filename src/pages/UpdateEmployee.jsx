import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, MenuItem, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const departments = ["DEVELOPMENT", "MARKETING", "FINANCE", "HR", "IT", "PRODUCTION", "DELIVERY"];
const designations = [
  "JR DEVELOPER", "SR DEVELOPER", "TESTER", "JR HR", "SR HR", "MANAGER", "SUPERVISER",
  "TL", "MARKETING HEAD", "DELIVERY HEAD", "DIRECTOR"
];

export const UpdateEmployee = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/${id}`);
      const user = res.data.data;
      // Set default values
      for (const key in user) {
        if (key in user) setValue(key, user[key]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/users/${id}`, data);
      alert("Employee updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update employee");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5" mb={3}>Update Employee</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <TextField label="First Name" {...register("firstName")} fullWidth />
            <TextField label="Last Name" {...register("lastName")} fullWidth />
            <TextField label="Email" {...register("email")} fullWidth />
            <TextField label="Contact" {...register("contact")} fullWidth />
            <TextField label="Joining Date" {...register("joiningDate")} fullWidth placeholder="dd/mm/yyyy" />
            <TextField label="Last Company Name" {...register("lastCompnayName")} fullWidth />
            <TextField label="Last Salary" type="number" {...register("lastSalary")} fullWidth />
            <TextField label="Current Salary" type="number" {...register("currentSalary")} fullWidth />
            <TextField
              select
              label="Department"
              {...register("department")}
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Designation"
              {...register("designation")}
              fullWidth
            >
              {designations.map((desig) => (
                <MenuItem key={desig} value={desig}>{desig}</MenuItem>
              ))}
            </TextField>
            <TextField label="Total Experience (Years)" type="number" {...register("totalExp")} fullWidth />
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
