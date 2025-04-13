import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  LinearProgress,
  Chip,
  useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import FlagIcon from '@mui/icons-material/Flag';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const theme = useTheme();
  const [appreciations, setAppreciations] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`/empgoal/user/${userId}`);
        const goalsWithId = response.data.goals.map((goal, index) => ({
          id: goal._id || index, // Use existing unique identifier or fallback to index
          ...goal,
        }));
        setGoals(goalsWithId);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);


  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests from the API
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('/leave/all');
        console.log(response.data)
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const salaryData = [
    { month: 'Jan', salary: 50000 },
    { month: 'Feb', salary: 52000 },
    { month: 'Mar', salary: 53000 },
    { month: 'Apr', salary: 54000 },
    { month: 'May', salary: 56000 },
    { month: 'Jun', salary: 58000 },
  ];

  //const leaveRequests = /* your array of leave requests */;

const leaveInfo = {
  totalLeaves: 24,
  leavesTaken: leaveRequests?.length || 0
};

// Calculate balance after defining the object
leaveInfo.balance = leaveInfo.totalLeaves - leaveInfo.leavesTaken;

  const fetchData = async () => {
    const userId = localStorage.getItem("id");
    const res = await axios.get(`/appriciations/user/${userId}`);
    setAppreciations(res.data.data);
    setFiltered(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //const appreciations = 7;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, setValue } = useForm  ();

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



  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "info";
      case "Pending": return "warning";
      default: return "default";
    }
  };

  const columns = [
    { field: 'title', headerName: 'Goal', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color={getStatusColor(params.value)} variant="outlined" />
      )
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f7f9fc', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        🚀 Welcome back, {user?.firstName.split(" ")[0]}!
      </Typography>

      <Grid container spacing={3}>
        {/* User Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
             <Avatar sx={{ width: 72, height: 72 }} /> 
            <Box>
              <Typography variant="h6">{user?.firstName}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.role?.name}</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Appreciations */}
        <Grid item xs={12} sm={4} md={2.5}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <EmojiEventsIcon fontSize="large" color="warning" />
            <Typography mt={1} variant="body1">Appreciations</Typography>
            <Typography variant="h5" fontWeight="bold">{appreciations?.length}</Typography>
          </Card>
        </Grid>

        {/* Leaves Summary */}
        <Grid item xs={12} sm={4} md={3.5}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <WorkHistoryIcon color="primary" />
              <Typography variant="body1">Leave Summary</Typography>
            </Box>
            <Typography mt={1}>Total: {leaveInfo.totalLeaves}</Typography>
            <Typography>Taken: {leaveInfo.leavesTaken}</Typography>
            <Typography>Balance: {leaveInfo.balance}</Typography>
            <LinearProgress
              variant="determinate"
              value={(leaveInfo.leavesTaken / leaveInfo.totalLeaves) * 100}
              sx={{ mt: 1.5 }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Salary Chart */}
      <Grid item xs={12} mt={5}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>💰 Monthly Salary Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke={theme.palette.primary.main} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Goals Section */}
      <Grid item xs={12} mt={5}>
      <Card sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FlagIcon color="secondary" />
          <Typography variant="h6">🎯 Upcoming Goals</Typography>
        </Box>
        <Box sx={{ height: 350 }}>
          <DataGrid
            rows={goals}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': { fontSize: '14px' },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: (theme) => theme.palette.grey[100],
                fontWeight: 'bold',
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Card>
    </Grid>
    </Box>
  );
};

export default Dashboard;
