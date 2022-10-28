import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { getData } from '../services/data.service';

// const rows = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'createdBy', headerName: 'Created By', width: 100 },
    { field: 'createdDate', headerName: 'Created Date', width: 150 },
    { field: 'fileName', headerName: 'File Name', width: 150 },
    { field: 'path', headerName: 'Path', width: 400 },
];

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            setData(await getData());
        })();
    }, []);

    const handleEvent = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        alert(`${params.row._id}`);
    };

    return (
        <Box sx={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={data}
                onRowClick={handleEvent}
                columns={columns}
                getRowId={(row) => row._id} />
        </Box>
    )
}

export default Home