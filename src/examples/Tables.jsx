import DataTable from '../components/common/DataTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
];

const rows = [
  { id: 1, lastName: 'Sharma', firstName: 'Amit', age: 25 },
  { id: 2, lastName: 'Patel', firstName: 'Riya', age: 30 },
];

export const Tables = () => {
  return (
    <div>
      <DataTable
        title="User List"
        columns={columns}
        rows={rows}
        checkboxSelection
        onRowClick={(params) => console.log('Clicked Row:', params.row)}
      />
    </div>
  );
};

