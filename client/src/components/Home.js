import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { getData } from '../services/data.service';
import { useNavigate } from 'react-router-dom';


const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
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

    const navigate = useNavigate();

    const handleEvent = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        const id = params.row._id;
        navigate(`/${id}`);
        // alert(`${params.row._id}`);
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