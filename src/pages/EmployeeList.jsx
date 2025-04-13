import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const getEmployees = async () => {
    try {
      const response = await axios.get('/users'); // Adjust API route
      console.log(response.data)
      const data = response.data.data.map((emp, index) => ({
        id: emp._id || index,
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.email,
        contact: emp.contact,
        role: emp.role?.name || 'N/A',
        department: emp.department,
        designation: emp.designation,
        joiningDate: emp.joiningDate,
        currentSalary: emp.currentSalary,
        totalExp: emp.totalExp,
      }));
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [search, employees]);

  const navigaete = useNavigate()
  const handleAppriciation = (id)=>{
    navigaete("/hr/empappriciation/"+id)  
  }
  const handleAapprisal = (id)=>{
    navigaete("/hr/apperisial/"+id)  
  }
  const handleUpdate = (id)=>{
    navigaete("/hr/updatemp/"+id)  
  }
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'contact', headerName: 'Contact', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'joiningDate', headerName: 'Joining Date', flex: 1 },
    { field: 'currentSalary', headerName: 'Current Salary', type: 'number', flex: 1 },
    { field: 'totalExp', headerName: 'Experience (yrs)', type: 'number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 280, // increased fixed width instead of flex
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleAppriciation(params.row.id)}
          >
            Appreciation
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleAapprisal(params.row.id)}
          >
            Appraisal
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleUpdate(params.row.id)}
          >
            UPDATE
          </Button>
        </div>
      )
    }
  ];
  

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Employee List
      </Typography>

      <TextField
        label="Search Employee"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </Box>
    </Box>
  );
};
