
import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, Typography, TextField, Select, MenuItem, Button, InputLabel, FormControl,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import axios from 'axios';
import goalImage from '../assets/images/goal.jpg'; // Ensure you have an appropriate image

const goalTypes = [
    "Certification", "Team mentoring", "Upgrade New Tech",
    "Blog Writing", "Interview Taking", "Help in Marketing", "Refer New Employee"
  ];
const MyGoals = () => {
    const [goals, setGoals] = useState([]);
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [goalType, setGoalType] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    useEffect(() => {
      const fetchGoals = async () => {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`/empgoal/user/${userId}`);
        setGoals(response.data.goals);
        setFilteredGoals(response.data.goals);
      };
  
      fetchGoals();
    }, []);
  
    useEffect(() => {
      let filtered = goals;
  
      if (searchTerm) {
        filtered = filtered.filter(goal =>
          goal.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (goalType) {
        filtered = filtered.filter(goal => goal.type === goalType);
      }
  
      if (status) {
        filtered = filtered.filter(goal => goal.status === status);
      }
  
      if (startDate) {
        filtered = filtered.filter(goal => dayjs(goal.startDate).isAfter(dayjs(startDate).subtract(1, 'day')));
      }
  
      if (endDate) {
        filtered = filtered.filter(goal => dayjs(goal.endDate).isBefore(dayjs(endDate).add(1, 'day')));
      }
  
      setFilteredGoals(filtered);
    }, [searchTerm, goalType, status, startDate, endDate, goals]);
  
    return (
      <Grid container spacing={2}>
        {/* Left Section: Filters and Goals List */}
        <Grid item xs={12} md={8}>
          {/* Filters */}
          <Card>
            <CardContent>
              <Typography variant="h6">Filter Goals</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={goalType}
                      onChange={(e) => setGoalType(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {goalTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Start Date"
                    dateFormat="yyyy-MM-dd"
                    customInput={<TextField fullWidth variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="End Date"
                    dateFormat="yyyy-MM-dd"
                    customInput={<TextField fullWidth variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSearchTerm('');
                      setGoalType('');
                      setStatus('');
                      setStartDate(null);
                      setEndDate(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
  
          {/* Goals List */}
          <Grid container spacing={2} mt={2}>
            {filteredGoals.map((goal) => (
              <Grid item xs={12} key={goal._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{goal.title}</Typography>
                    <Typography>Type: {goal.type}</Typography>
                    <Typography>Status: {goal.status}</Typography>
                    <Typography>Start Date: {goal.startDate}</Typography>
                    <Typography>End Date: {goal.endDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
  
        {/* Right Section: Goal Image */}
        <Grid item xs={12} md={4}>
          <img src={goalImage} alt="Goal" style={{ width: '100%', borderRadius: 8 }} />
        </Grid>
      </Grid>
    );
  };
  
  export default MyGoals;
  