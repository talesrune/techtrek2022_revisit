import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef} from '@mui/x-data-grid';
import axios from 'axios'
import {
    useQuery
  } from '@tanstack/react-query'
// import process from 'react-scripts'

const rows:any = [
{ id: 1, balance: 9000 },
{ id: 2, balance: 68 },

];

// const rateRows: any = [
//   {
//     "id": 1,
//     "base_currency": "SGD",
//     "exchange_currency": "CAD",
//     "rate": 0.9255
//   },
//   {
//     "id": 2,
//     "base_currency": "SGD",
//     "exchange_currency": "CNH",
//     "rate": 4.7868
//   },
//   {
//     "id": 3,
//     "base_currency": "SGD",
//     "exchange_currency": "EUR",
//     "rate": 0.7086
//   },
//   {
//     "id": 4,
//     "base_currency": "SGD",
//     "exchange_currency": "HKD",
//     "rate": 5.583
//   },
//   {
//     "id": 5,
//     "base_currency": "SGD",
//     "exchange_currency": "JPY",
//     "rate": 97.5303
//   },
//   {
//     "id": 6,
//     "base_currency": "SGD",
//     "exchange_currency": "NZD",
//     "rate": 1.1612
//   },
//   {
//     "id": 7,
//     "base_currency": "SGD",
//     "exchange_currency": "NOK",
//     "rate": 7.2912
//   },
//   {
//     "id": 8,
//     "base_currency": "SGD",
//     "exchange_currency": "GBP",
//     "rate": 0.5974
//   },
//   {
//     "id": 9,
//     "base_currency": "SGD",
//     "exchange_currency": "SEK",
//     "rate": 7.5168
//   },
//   {
//     "id": 10,
//     "base_currency": "SGD",
//     "exchange_currency": "THB",
//     "rate": 25.7275
//   },
//   {
//     "id": 11,
//     "base_currency": "SGD",
//     "exchange_currency": "USD",
//     "rate": 0.7113
//   }
// ]

const columns2: GridColDef[] = [
{ field: 'id', headerName: 'Wallet number', width: 150 },
{ field: 'balance', headerName: 'Balance', width: 150 },
{ field: 'view', headerName: 'View wallet', width: 150 },
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

const Dashboard = () => {
  const user = localStorage.getItem('user');
//   const userId = user?.split(',')[0]
  const name = user?.split(',')[1]

  const {data:rateRows} = useQuery({ queryKey: ['getrates'], queryFn: getRates })

//   console.log(rateRows?.data)
//   getRates()

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
        
        <Grid item xs={6}>

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