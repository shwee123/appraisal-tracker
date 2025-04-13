// AppreciationList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, MenuItem, TextField, Select, InputLabel, FormControl,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const appreciationTypes = ["Performance", "Teamwork", "Innovation", "Leadership", "Punctuality", "Milestone"];

const MyAppriciation = () => {
  const [appreciations, setAppreciations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [searchReason, setSearchReason] = useState('');

  const fetchData = async () => {
    const userId = localStorage.getItem("id");
    const res = await axios.get(`/appriciations/user/${userId}`);
    setAppreciations(res.data.data);
    setFiltered(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let temp = [...appreciations];
    if (month) temp = temp.filter(item => dayjs(item.appreciationDate).month() + 1 === parseInt(month));
    if (year) temp = temp.filter(item => dayjs(item.appreciationDate).year() === parseInt(year));
    if (type) temp = temp.filter(item => item.appreciationType === type);
    if (searchReason) temp = temp.filter(item => item.reason.toLowerCase().includes(searchReason.toLowerCase()));
    setFiltered(temp);
  }, [month, year, type, searchReason]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>🎉 My Appreciations</Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select value={month} label="Month" onChange={(e) => setMonth(e.target.value)}>
              {[...Array(12).keys()].map(i => (
                <MenuItem key={i+1} value={i+1}>{dayjs().month(i).format('MMMM')}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
              {[2023, 2024, 2025].map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
              {appreciationTypes.map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by Reason"
            value={searchReason}
            onChange={(e) => setSearchReason(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Appreciation Cards */}
      <Grid container spacing={3}>
        {filtered.length === 0 ? (
          <Typography>No appreciations found</Typography>
        ) : filtered.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item._id}>
            <Card sx={{ borderRadius: 4, boxShadow: 4, background: "#f9f9ff" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.appreciationType} 🎖️
                </Typography>
                <Typography variant="body1">
                  <strong>Reason:</strong> {item.reason}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {dayjs(item.appreciationDate).format('MMM DD, YYYY')}
                </Typography>
                <Typography variant="body2" mt={1}>
                  <strong>Message:</strong> {item.message}
                </Typography>
                <Typography variant="body2" mt={1}>
                  <strong>By:</strong> {item.hr.firstName} {item.hr.lastName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyAppriciation;
