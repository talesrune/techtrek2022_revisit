import React from 'react'
import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef} from '@mui/x-data-grid';

const CloseAccount = () => {
  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Close Account</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Do you really want to close the account?</Typography>
        </Grid>
        <Grid item xs={6}>
        <Button>Yes</Button>
        <Button>No</Button>
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default CloseAccount