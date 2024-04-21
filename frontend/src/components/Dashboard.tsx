import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef} from '@mui/x-data-grid';
import axios from 'axios'
import {
    useQuery
  } from '@tanstack/react-query'

const walletColumns: GridColDef[] = [
    { field: 'name', headerName: 'Wallet Type', width: 250 },
];

const rateColumns: GridColDef[] = [
    // { field: 'id', headerName: 'id', width: 150 },
    { field: 'base_currency', headerName: 'Base Currency', width: 150 },
    { field: 'exchange_currency', headerName: 'Exchange Currency', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 150 },
];

const ping = async () => {
    try{
        const res = await axios({
            url: import.meta.env.VITE_BACKURL_PING ?? 'https://techtrek2022revisit-production.up.railway.app/ping', //'http://localhost:3000/ping',
            method:'GET',
            timeout:20000,
        })
        alert(res.data)
        return res

    } catch(error) {
        console.error(error)
    }
}
const getRates = async () => {
    try{
        const res = await axios({
            url: import.meta.env.VITE_BACKURL_RATES ?? 'https://techtrek2022revisit-production.up.railway.app/getrates',
            method:'GET',
            timeout:20000,
        })
        return res

    } catch(error) {
        console.error(error)
    }
}

const getWalletsByUser = async (userId:string) => {
    try{
        const res = await axios({
            url: import.meta.env.VITE_BACKURL_WALLETS ?? 'https://techtrek2022revisit-production.up.railway.app/getwalletsbyuser',
            method:'POST',
            timeout:20000,
            data: {user_id:userId}
        })
        return res

    } catch(error) {
        console.error(error)
    }
}

const Dashboard = () => {
  const user = localStorage.getItem('user');
  const userId = user?.split(',')[0]
  const name = user?.split(',')[1]

  const {data:rateRows} = useQuery({ queryKey: ['getrates'], queryFn: getRates })
  const {data:walletRows} = useQuery({ queryKey: ['getwalletsbyuser'], queryFn: ()=>{return getWalletsByUser(userId ?? '')}})

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
            <Typography>Current exchange rates</Typography>
        </Grid>
        <Grid item xs={6}>
        {rateRows && <DataGrid
            rows={rateRows?.data}
            columns={rateColumns} //columns
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
        
        <Grid item xs={4}>

        {walletRows &&   <DataGrid
            rows={walletRows?.data}
            columns={walletColumns} //columns
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
        }
            
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default Dashboard