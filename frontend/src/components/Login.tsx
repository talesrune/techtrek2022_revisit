import React from 'react'
import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, TextField, Typography } from '@mui/material'
import { GridColDef} from '@mui/x-data-grid';

const rows = [
{ id: 1, balance: 9000 },
{ id: 2, balance: 68 },
];

const columns2: GridColDef[] = [
{ field: 'id', headerName: 'Wallet number', width: 150 },
{ field: 'balance', headerName: 'Balance', width: 150 },
{ field: 'view', headerName: 'View wallet', width: 150 },
];

const Login = () => {
  return (
    <div style={{display:'flex'}}>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField label='username'></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField label='password'></TextField>
        </Grid>
        <Grid item xs={12}>
            <Button>Login</Button>
        </Grid>
        </Grid>
    </Box>
        
    </div>
  )
}

export default Login