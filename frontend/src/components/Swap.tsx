import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, NativeSelect, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const Swap = () => {
  const curList = ['SGD','USD']
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  return (
    <div style={{display:'flex'}}>
    <MiniDrawer/>
    <Box sx={{marginTop:'5em', marginLeft:'1em', width:'100%', alignItems:'center'}}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Swap</Typography>
        </Grid>
        <Grid item xs={12}>
        <Paper elevation={1} sx={{width:'45%', height:'20em', backgroundColor:'rgb(48,66,86)'}}>
            <Grid container spacing={0}>
            <Grid item xs={0.5}/>
            <Grid item xs={11}>
              <Typography sx={{paddingTop:'1em', color:'rgb(255,255,239)'}}>You are paying</Typography>
              <Paper elevation={0} sx={{width:'100%', backgroundColor:'rgb(25,35,45)'}}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <NativeSelect
                      variant='standard'
                      value={from}
                      sx={{height:'50%', marginLeft:'1em', marginTop:'1em', color:'rgb(255,255,239)', backgroundColor:'rgba(254,35,45,0.4)', fontSize:'20px', 'option':{color:'rgb(0,0,0)'}}}
                      onChange={(e:any)=>{
                        setFrom(e.target.value)
                      }}
                    >
                      <option key={new Date().getTime() + 'select'} value={''}>Select an option</option>
                      {
                        curList.map((item)=>{
                          return <option key={new Date().getTime() + item} value={item}>{item}</option>
                        })
                      }
                    </NativeSelect>
                  </Grid>
                 
                  <Grid item xs={9}>
                    <TextField 
                      fullWidth
                      sx={{
                        // backgroundColor:'rgba(254,35,45,0.4)',
                        "input":{ 
                        color:'rgb(255,255,239)',
                        height:'3em',
                        }
                      }}
                      placeholder="0.0"
                      inputProps={{
                        sx: {
                          textAlign: "right",
                          "&::placeholder": {
                            textAlign: "right",
                          },
                        },
                      }}
                    >
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={0.5}/>
            </Grid>
{/* here */}
            <Grid container spacing={0}>
            <Grid item xs={0.5}/>
            <Grid item xs={11}>
              <Typography sx={{paddingTop:'1em', color:'rgb(255,255,239)'}}>To Receive</Typography>
              <Paper elevation={0} sx={{width:'100%', backgroundColor:'rgb(25,35,45)'}}>
                <Grid container spacing={0}>
                  <Grid item xs={3}>
                    <NativeSelect
                      variant='standard'
                      value={to}
                      sx={{height:'50%', marginLeft:'1em', marginTop:'1em', color:'rgb(255,255,239)', backgroundColor:'rgba(254,35,45,0.4)', fontSize:'20px', 'option':{color:'rgb(0,0,0)'}}}
                      onChange={(e:any)=>{
                        setTo(e.target.value)
                      }}
                    >
                      <option key={new Date().getTime() + 'select'} value={''}>Select an option</option>
                      {
                        curList.map((item)=>{
                          return <option key={new Date().getTime() + item} value={item}>{item}</option>
                        })
                      }
                    </NativeSelect>
                  </Grid>
                 
                  <Grid item xs={9}>
                    <TextField 
                      fullWidth
                      sx={{
                        // backgroundColor:'rgba(254,35,45,0.4)',
                        "input":{ 
                        color:'rgb(255,255,239)',
                        height:'3em',
                        }
                      }}
                      placeholder="0.0"
                      inputProps={{
                        sx: {
                          textAlign: "right",
                          "&::placeholder": {
                            textAlign: "right",
                          },
                        },
                      }}
                    >
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={0.5}/>
            <Grid item xs={10.5}/>
            <Grid item xs={1.5} >
              <Button variant='contained' sx={{marginTop:'1em'}}>SWAP</Button> 
            </Grid>
            </Grid>
{/* to here */}
        </Paper>
        </Grid>
        
        </Grid>
    </Box>
        
    </div>
  )
}

export default Swap