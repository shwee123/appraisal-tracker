import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const LeaveRequestList = () => {
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

  const handleAction = async (id, status) => {
    try {
      await axios.put(`/leave/${id}/status`,{status:status});
      // Update the local state to reflect the change
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error(`Error updating leave request status to ${status}:`, error);
    }
  };

  const columns = [
    {
        field: 'employeeId',
        headerName: 'Employee Name',
        flex: 1,
        valueGetter: (params) =>params.firstName,
      },
    { field: 'leaveType', headerName: 'Leave Type', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    { field: 'reason', headerName: 'Reason', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleAction(params.row._id, 'approved')}
            disabled={params.row.status !== 'pending'}
            sx={{ mr: 1 }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleAction(params.row.id, 'rejected')}
            disabled={params.row.status !== 'pending'}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Leave Requests
      </Typography>
      <DataGrid
        rows={leaveRequests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row)=>row._id}
      />
    </Box>
  );
};

export default LeaveRequestList;
