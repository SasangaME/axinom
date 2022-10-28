import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

function Home() {
    const handleEvent = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        alert(`Movie "${params.row.col1}" clicked`);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} onRowClick={handleEvent} columns={columns} />
        </Box>
    )
}

export default Home