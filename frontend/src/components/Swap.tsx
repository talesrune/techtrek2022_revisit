import React from 'react'
import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef} from '@mui/x-data-grid';

const Swap = () => {
  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Swap</Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography>You are paying</Typography>
        <Typography>USDC</Typography>
        <Typography>0.00</Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography>You are receiving</Typography>
        <Typography>MEW</Typography>
        <Typography>0.00</Typography>
        </Grid>
        <Grid item xs={12}>
        <Button>SWAP</Button>
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default Swap