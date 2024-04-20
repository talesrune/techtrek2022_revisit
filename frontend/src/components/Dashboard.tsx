import React from 'react'
import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef} from '@mui/x-data-grid';
import axios from 'axios'

const rows = [
{ id: 1, balance: 9000 },
{ id: 2, balance: 68 },

];

const columns2: GridColDef[] = [
{ field: 'id', headerName: 'Wallet number', width: 150 },
{ field: 'balance', headerName: 'Balance', width: 150 },
{ field: 'view', headerName: 'View wallet', width: 150 },
];

const ping = async () => {
    try{
        const res = await axios({
            url: 'http://localhost:3000/ping',
            method:'GET',
            timeout:20000,
        })
        alert(res.data)
        return res

    } catch(error) {
        console.error(error)
    }
}
const Dashboard = () => {
  const user = localStorage.getItem('user');
  const userId = user?.split(',')[0]
  const name = user?.split(',')[1]
  

  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={1}>
            <Typography>Welcome {name}</Typography>
        </Grid>
        <Grid item xs={1}>
            <Button variant='contained' onClick={()=>{ping()}}>Ping</Button>
        </Grid>
        <Grid item xs={10}/>
        <Grid item xs={12}>
            <Typography>Live update on exchange rates</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h2'>1 SGD = 2.53 MYR</Typography>
        </Grid>
        <Grid item xs={12}>

            <DataGrid
            rows={rows}
            columns={columns2} //columns
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            autoHeight
            pageSizeOptions={[10,20,50,100]}
            // checkboxSelection
            disableRowSelectionOnClick
        />
            
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default Dashboard