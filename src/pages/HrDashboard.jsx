import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const drawerWidth = 240;

// Dummy data
const dummyBarData = [
  { name: "Jan", Attendance: 80 },
  { name: "Feb", Attendance: 92 },
  { name: "Mar", Attendance: 75 },
  { name: "Apr", Attendance: 88 },
];


const COLORS = ["#0088FE", "#FF8042"];

// Dynamic menu items
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "dashboard" },
  { text: "Add Employee", icon: <PersonAddIcon />, link: "addemployee" },
  { text: "View Employees", icon: <PeopleIcon />, link: "viewemployees" },
  { text: "View Reports", icon: <BarChartIcon />, link: "viewreports" },
];

const HrDashboard = () => {
  const [users, setusers] = useState([]);

  const getAllEmployees = async () => {
    const res = await axios.get("/users/");
    setusers(res.data.data);
  };
  const [todayAttendance, settodayAttendance] = useState([])
  const getpresentemployeeoftoday = async()=>{

    const res = await axios.get("/empattendance/today/today1")
    console.log("....",res.data)
    settodayAttendance(res.data)

  }
  const [leaveRequests, setleaveRequests] = useState([])
  const getallLeaveRequest = async()=>{
    const res = await axios.get("/leave/all")
    console.log(res.data)
    setleaveRequests(res.data)
  }

  useEffect(()=>{
    getAllEmployees()
    getpresentemployeeoftoday()
    getallLeaveRequest()
  },[])

  const pieData = [
    { name: "Present", value: todayAttendance?.length},
    { name: "Absent", value: users?.length },
  ];
  


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f6f8",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome, HR Manager 👋
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h4" fontWeight="bold">
                {users?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Today's Attendance</Typography>
              <Typography variant="h4" fontWeight="bold">
                {todayAttendance?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Leave Requests</Typography>
              <Typography variant="h4" fontWeight="bold">
                {leaveRequests?.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Attendance Overview
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyBarData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Attendance" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Attendance Ratio
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HrDashboard;
