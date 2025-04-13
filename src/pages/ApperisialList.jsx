import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';

const ApperisialList = () => {
  const [appraisals, setAppraisals] = useState([]);
  const [filteredAppraisals, setFilteredAppraisals] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/appricial"); // Replace with your endpoint
      setAppraisals(res.data);
      setFilteredAppraisals(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = appraisals.filter(appraisal =>
      appraisal.employeeId?.firstName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAppraisals(filtered);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Appraisal Records
        </Typography>

        {/* Search Bar */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Search by Employee Name"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* Table Header */}
        <Grid container spacing={2} sx={{ fontWeight: 'bold', mb: 1 }}>
          {[
            "Name",
            "Attendance",
            "Goal",
            "Discipline",
            "Communication",
            "Teamwork",
            "Initiative",
            "Final Score",
            "Remarks",
            "Date"
          ].map((head, i) => (
            <Grid item xs={1.2} key={i}>
              <Typography fontWeight="bold">{head}</Typography>
            </Grid>
          ))}
        </Grid>

        {/* Table Body */}
        {filteredAppraisals.map((appraisal, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
            <Grid item xs={1.2}>{appraisal.employeeId?.firstName +" "+ appraisal.employeeId?.lastName || 'N/A'}</Grid>
            <Grid item xs={1.2}>{appraisal.attendanceRating}</Grid>
            <Grid item xs={1.2}>{appraisal.goalCompletionRating}</Grid>
            <Grid item xs={1.2}>{appraisal.disciplineRating}</Grid>
            <Grid item xs={1.2}>{appraisal.communicationRating}</Grid>
            <Grid item xs={1.2}>{appraisal.teamworkRating}</Grid>
            <Grid item xs={1.2}>{appraisal.initiativeRating}</Grid>
            <Grid item xs={1.2}>{appraisal.finalScore}</Grid>
            <Grid item xs={1.2}>
              <Typography variant="body2" noWrap>
                {appraisal.overallRemarks}
              </Typography>
            </Grid>
            <Grid item xs={1.2}>
              {new Date(appraisal.createdAt).toLocaleDateString()}
            </Grid>
          </Grid>
        ))}

        {filteredAppraisals.length === 0 && (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No records found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ApperisialList;
