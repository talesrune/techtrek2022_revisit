import Grid from '@mui/material/Grid'
import { NativeSelect, Paper, TextField, Typography, TextFieldProps, inputBaseClasses } from '@mui/material'
import { yellow } from "@mui/material/colors";
import { useFormContext } from 'react-hook-form';

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


const SwapTextField = ({label, type, base, exchange, from, setFrom, to, setTo, rateData}:
  {label: string, type:string, base:Set<string>, exchange:Set<string>, from: string, setFrom:any, to: string, setTo:any, rateData:any}) => {
  // const curList = ['SGD','USD']

  const cur1 = Array.from(base.values());
  const cur2 = Array.from(exchange.values());
  const curList = cur1.concat(cur2)
  // console.log(curList)

  const {register, setValue} = useFormContext()

  const checkOptions = () => {
    if (type === 'from') {          //to has something and not SGD
      // const ind_cur = (to !== '' && !cur1.includes(to))? cur1.concat([to]) : cur1
      if(cur1.includes(from)  || cur2.includes(to)){
        return cur1.map((item)=>{
          return <option key={new Date().getTime() + item} value={item}>{item}</option>
        })
      } else if (cur2.includes(from) || cur1.includes(to)) {
        return cur2.map((item)=>{
          return <option key={new Date().getTime() + item} value={item}>{item}</option>
        })
      }      
    } else if (type === 'to') {
      if(cur1.includes(to)  || cur2.includes(from)){
        return cur1.map((item)=>{
          return <option key={new Date().getTime() + item} value={item}>{item}</option>
        })
      } else if (cur2.includes(to)  || cur1.includes(from)) {
        return cur2.map((item)=>{
          return <option key={new Date().getTime() + item} value={item}>{item}</option>
        })
      }
    }
    return curList.map((item)=>{
      return <option key={new Date().getTime() + item} value={item}>{item}</option>
    })
  }

  const checkRates = (inputAmt:number) => {
    rateData?.data.map((obj:any)=> {
      if (obj.base_currency === from && obj.exchange_currency === to) {
        if(type === 'from') {
          console.log('setting To amt based on From: ' + inputAmt + ' and ' + obj.rate)
          setValue('toAmt', inputAmt*obj.rate)
        } else {
          console.log('setting From amt based on To: ' + inputAmt + ' and ' + obj.rate)
          setValue('fromAmt', inputAmt/obj.rate)

        }
      } else if (obj.base_currency === to && obj.exchange_currency === from) {
        if(type === 'from') {
          console.log('setting to amt based on From (2): ' + inputAmt + ' and ' + obj.rate)
          setValue('toAmt', inputAmt/obj.rate)
        } else {
          console.log('setting From amt based on To (2): ' + inputAmt + ' and ' + obj.rate)
          setValue('fromAmt', inputAmt*obj.rate)
        }
      }
    })
  }
  return (
    <div style={{display:'flex'}}>
            <Grid container spacing={0}>
            <Grid item xs={0.5}/>
            <Grid item xs={11}>
              <Typography sx={{paddingTop:(type === 'from')?'1em':'0em', color:'rgb(255,255,239)'}}>{label}</Typography>
              <Paper elevation={0} sx={{width:'100%', backgroundColor:'rgb(25,35,45)', borderRadius:'10px'}}>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <NativeSelect
                      variant='standard'
                      value={(type === 'from') ? from : to}
                      sx={{borderRadius:'10px', height:'50%', marginLeft:'1em', marginTop:'1em', color:'rgb(255,255,239)', backgroundColor:'rgba(254,35,45,0.4)', fontSize:'16px', 'option':{color:'rgb(0,0,0)'}}}
                      onChange={(e:any)=>{
                        if (type === 'from') {
                          setFrom(e.target.value)
                        } else {
                          setTo(e.target.value)
                        }
                      }}
                    >
                      <option key={new Date().getTime() + 'select'} value={''}>Choose</option>
                      {checkOptions()}
                    </NativeSelect>
                  </Grid>
                 
                  <Grid item xs={8}>
                    <TextField 
                      {...(type==='from') ? 
                      {...register('fromAmt', {
                          onChange: (e) => {
                            checkRates(e.target.value)
                            console.log('from moving')
                          }
                        })
                      }:{...register('toAmt', {
                          onChange: (e) => {
                            checkRates(e.target.value)
                            console.log('to moving')                            
                          }
                        })
                      }}
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