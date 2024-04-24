import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, NativeSelect, Paper, TextField, Typography, TextFieldProps, inputBaseClasses, Toolbar } from '@mui/material'
import { useState } from 'react'
import { yellow } from "@mui/material/colors";
import SwapTextField from './SwapTextField';
import axios from 'axios'
import {
  useQuery
} from '@tanstack/react-query'

const getRates = async () => {
  try{
      const res = await axios({
          url: import.meta.env.VITE_BACKURL_RATES ?? 'https://techtrek2022revisit-production.up.railway.app/getrates',
          method:'GET',
          timeout:20000,
      })
      return res

  } catch(error) {
      alert(error)
      console.error(error)
  }
}

const Swap = () => {
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')
  // const hello = 'world'

  const {data:rateData} = useQuery({ queryKey: ['getrates'], queryFn: getRates })
  // console.log(rateData.dataurrency)
  
  const base_currency = new Set<string>()
  const exchange_currency = new Set<string>()

  rateData?.data.map((obj:any)=> {
    base_currency.add(obj.base_currency)
    exchange_currency.add(obj.exchange_currency)
  })
  // rateData?.data.map((obj:any)=> ex.add(obj.base_currency))

  // console.log(base_currency)
  // console.log(exchange_currency)
  
  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em', width:'100%', alignItems:'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <Typography>Swap</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ maxWidth:'448px', height:'17em', backgroundColor:'rgb(48,66,86)', borderRadius:'15px'}}>
              <SwapTextField label={'You are paying'} base={base_currency} exchange={exchange_currency}/>
              <SwapTextField label={'To Receive'} base={base_currency} exchange={exchange_currency}/>
              <Toolbar  sx={{ justifyContent: "space-between" }}>   
                <div/>
                <Button variant='contained'>SWAP</Button> 
              </Toolbar >
            </Paper>
          </Grid>         
        </Grid>
    </Box>
        
    </div>
  )
}

export default Swap