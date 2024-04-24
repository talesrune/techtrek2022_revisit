import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, NativeSelect, Paper, TextField, Typography, TextFieldProps, inputBaseClasses } from '@mui/material'
import { useState } from 'react'
import { yellow } from "@mui/material/colors";

const InputLabelProps: TextFieldProps["InputLabelProps"] = {
  shrink: true,
  sx: {
    color: "text.primary",
    transform: "translate(0, 1.5px) scale(0.8)",
    letterSpacing: 1,
    "&.Mui-focused:not(.Mui-error)": {
      color: "text.primary",
    },
  },
};
const InputProps: TextFieldProps["InputProps"] = {
  disableUnderline: true,
  sx: {
    // backgroundColor: "grey.200",
    transition: "0.3s",
    "label + &": {
      marginTop: "24px",
    },
    [`&.${inputBaseClasses.focused}`]: {
      // backgroundColor: "common.white",
      boxShadow: `0 0 0 2px ${yellow[700]}`,
    },
    [`&.${inputBaseClasses.error}`]: {
      backgroundColor: "#fff0f0",
      [`&.${inputBaseClasses.focused}`]: {
        boxShadow: `0 0 0 2px #ff6b81`,
      },
    },
    // [`&.${inputBaseClasses.disabled}`]: {
    //   backgroundColor: "grey.50",
    // },
    [`& .${inputBaseClasses.input}`]: {
      padding: "1rem",
    },
  },
};

const SwapTextField = ({label, base, exchange}:{label: string, base:Set<string>, exchange:Set<string>}) => {
  // const curList = ['SGD','USD']
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const cur1 = Array.from(base.values());
  const cur2 = Array.from(exchange.values());
  const curList = cur1.concat(cur2)
  console.log(curList)

  return (
    <div style={{display:'flex'}}>
            <Grid container spacing={0}>
            <Grid item xs={0.5}/>
            <Grid item xs={11}>
              <Typography sx={{paddingTop:'1em', color:'rgb(255,255,239)'}}>{label}</Typography>
              <Paper elevation={0} sx={{width:'100%', backgroundColor:'rgb(25,35,45)', borderRadius:'10px'}}>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <NativeSelect
                      variant='standard'
                      value={from}
                      sx={{borderRadius:'10px', height:'50%', marginLeft:'1em', marginTop:'1em', color:'rgb(255,255,239)', backgroundColor:'rgba(254,35,45,0.4)', fontSize:'16px', 'option':{color:'rgb(0,0,0)'}}}
                      onChange={(e:any)=>{
                        setFrom(e.target.value)
                      }}
                    >
                      <option key={new Date().getTime() + 'select'} value={''}>Choose</option>
                      {
                        curList.map((item)=>{
                          return <option key={new Date().getTime() + item} value={item}>{item}</option>
                        })
                      }
                    </NativeSelect>
                  </Grid>
                 
                  <Grid item xs={8}>
                    <TextField 
                      variant='standard'
                      fullWidth
                      sx={{
                        // backgroundColor:'rgba(254,35,45,0.4)',
                        "input":{ 
                        color:'rgb(255,255,239)',
                        height:'2em',
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
                      InputProps={InputProps}
                    >
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={0.5}/>
            </Grid>
    </div>
  )
}

export default SwapTextField