import React from 'react'
import MiniDrawer from './MiniDrawer'
import Grid from '@mui/material/Grid'
import { Box, Button, TextField, Typography } from '@mui/material'
import { GridColDef} from '@mui/x-data-grid';
import {useForm, useFieldArray} from 'react-hook-form' //import the useForm hook
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    username:string
    password:string
}

const Login = () => {
    const navigate = useNavigate();
    const form = useForm<FormValues>( //pass the useForm hook to a constant
    {
        defaultValues:{
            username: '',
            password:''
        }
    })
    const {register,control, handleSubmit, formState} = form //bring out the object properties from useForm hook
    const {errors} = formState

    const onSubmit = async (dataToSend: FormValues) => {
        // console.log('Form submitted', data)
        try{
            const res = await axios({
                url: 'http://localhost:3000/login',
                method:'POST',
                timeout:20000,
                data: dataToSend
            })
            // console.log(res)
            if(typeof res.data === 'string') {
                alert('login failed')
            } else {
                console.log(res.data)
                alert('welcome ' + res.data.name)
                localStorage.setItem('user', res.data.id + ',' + res.data.name)
                navigate('/')
            }
    
        } catch(error) {
            console.error(error)
        }
    }

    return (
    <div style={{display:'flex'}}>
        <form onSubmit={handleSubmit(onSubmit)}> 
        <Box sx={{marginTop:'5em', marginLeft:'1em'}}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField label='username' {...register('username')}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField label='password' {...register('password')}></TextField>
            </Grid>
            <Grid item xs={12}>
                <Button type='submit'>Login</Button>
            </Grid>
            </Grid>
        </Box>
        </form>
    </div>
    )
}

export default Login