import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TableContainer,
  Chip
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';

export const AppriciationList = () => {
  const [appreciations, setAppreciations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/appriciations/all'); // Update if endpoint differs
        console.log(res.data)
        setAppreciations(res.data.data);
      } catch (err) {
        console.error("Error fetching appreciation data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        🙌 All Appreciations
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Employee</strong></TableCell>
              <TableCell><strong>HR</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Reason</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appreciations.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.user?.firstName} {item.user?.lastName}</TableCell>
                <TableCell>{item.hr?.firstName} {item.hr?.lastName}</TableCell>
                <TableCell>
                  <Chip label={item.appreciationType} color="primary" variant="outlined" />
                </TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>{moment(item.appreciationDate).format('DD MMM YYYY')}</TableCell>
              </TableRow>
            ))}
            {appreciations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No appreciation data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
