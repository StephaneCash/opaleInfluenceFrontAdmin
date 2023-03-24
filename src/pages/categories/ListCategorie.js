import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { baseUrlImage } from '../../bases/basesUrl';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nom', headerName: 'Nom', width: 130 },
  { field: 'description', headerName: 'Description', width: 250, scrollX: "auto" },
  {
    headerName: 'Image',
    width: 90,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={baseUrlImage + "/" + params.row.url} />
          {params.value}
        </>
      );
    }
  },
  {
    headerName: 'Image',
    width: 90,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={baseUrlImage + "/" + params.row.url} />
          {params.value}
        </>
      );
    }
  },
];

export default function ListCategorie(props) {
  let data = props;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data.data.value}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}