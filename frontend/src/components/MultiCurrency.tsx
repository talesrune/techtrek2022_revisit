import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'

const MultiCurrency = () => {
  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Multicurrency</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>JPY</Typography>
        <Typography>0.00</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>USD</Typography>
        <Typography>0.00</Typography>
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default MultiCurrency