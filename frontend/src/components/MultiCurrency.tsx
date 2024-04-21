import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import { GridColDef} from '@mui/x-data-grid';
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import {
  useQuery
} from '@tanstack/react-query'

const currencyColumns: GridColDef[] = [
  { field: 'wallet_id', headerName: 'Wallet Id', width: 150 },
  { field: 'currency', headerName: 'Currency', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'name', headerName: 'Wallet Type', width: 250 },
];

const getCurrencyByUser = async (userId:string) => {
  try{
      const url = import.meta.env.VITE_BACKURL_CURRENCIES ?? 'https://techtrek2022revisit-production.up.railway.app/getcurrencybyuser'
      const res = await axios({
          url: url + '/' + userId,
          method:'GET',
          timeout:20000
      })
      return res

  } catch(error) {
      alert(error)
      console.error(error)
  }
}
const MultiCurrency = () => {
  const user = localStorage.getItem('user');
  const userId = user?.split(',')[0]

  const {data:currencyRows} = useQuery({ queryKey: ['getcurrencybyuser'], queryFn: ()=>{return getCurrencyByUser(userId ?? '')}})

  // function getRowId(row:any) {
  //   return row.wallet_id;
  // }

  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Currencies</Typography>
        </Grid>
        <Grid item xs={10}>
        {currencyRows && <DataGrid
            // getRowId={getRowId}
            rows={currencyRows?.data}
            columns={currencyColumns} //columns
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 20,
                },
            },
            }}
            autoHeight
            pageSizeOptions={[10,20,50,100]}
            // checkboxSelection
            disableRowSelectionOnClick
        />        
        }
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default MultiCurrency