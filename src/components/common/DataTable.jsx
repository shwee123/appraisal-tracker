import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const DataTable = ({
  columns = [],
  rows = [],
  pageSize = 10,
  rowHeight = 52,
  checkboxSelection = false,
  onRowClick = () => {},
  title = '',
  autoHeight = true,
}) => {
  return (
    <Box sx={{ width: '100%', my: 3 }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ height: autoHeight ? 'auto' : 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick
          rowHeight={rowHeight}
          onRowClick={onRowClick}
          autoHeight={autoHeight}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
