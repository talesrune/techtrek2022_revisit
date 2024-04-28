import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, Paper, Typography, Toolbar } from '@mui/material'
import { useState } from 'react'
// import { yellow } from "@mui/material/colors";
import SwapTextField from './SwapTextField';
import axios from 'axios'
import {
  useQuery
} from '@tanstack/react-query'
import { useForm, FormProvider} from 'react-hook-form';

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

type FormValues = {
  fromAmt: Number
  toAmt: Number
}

const Swap = () => {
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

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

  const methods = useForm<FormValues>( //pass the useForm hook to a constant
  {
      defaultValues:{
          fromAmt: 0,
          toAmt:0
      }
  })
  const {getValues, setValue} = methods //bring out the object properties from useForm hook

  console.log(getValues())
  
  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em', width:'100%', alignItems:'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <Typography>Swap</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...methods} > 
            <Paper elevation={0} sx={{ maxWidth:'448px', height:'17em', backgroundColor:'rgb(48,66,86)', borderRadius:'15px'}}>
              <SwapTextField label={'You are paying'} 
                type={'from'}
                base={base_currency} 
                exchange={exchange_currency} 
                from={from} 
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                rateData={rateData}
                />
               <Box textAlign='center'><Button sx={{color:'rgb(255,255,239)'}} size={'small'} 
                  onClick={()=>{
                    let tempTo = to
                    setTo(from)
                    setFrom(tempTo)

                    let tempToAmt = getValues('toAmt')
                    setValue('toAmt', getValues('fromAmt'))
                    setValue('fromAmt', tempToAmt)
                  }}>Switch</Button>
              </Box>
              <SwapTextField label={'To Receive'} 
                type={'to'}
                base={base_currency} 
                exchange={exchange_currency} 
                from={from} 
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                rateData={rateData}
                />
              <Toolbar  sx={{ justifyContent: "space-between" }}>   
                <div/>
                <Button variant='contained'>SWAP</Button> 
              </Toolbar >
            </Paper>
            </FormProvider>
          </Grid>         
        </Grid>
    </Box>
        
    </div>
  )
}

export default Swap