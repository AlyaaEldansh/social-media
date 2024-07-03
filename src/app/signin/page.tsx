'use client'
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

 export default function signIn() {
    type FormValues = {
        email: string;
        password: string;
      };
      

      const [apiError, setApiError] = useState<string>('');
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const router = useRouter();
      const handleSignIn = async (formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setIsLoading(true);
    
        try {
          const response = await axios.post('https://linked-posts.routemisr.com/users/signin', formValues);
    
          if (response.data.message === 'success') {
            setIsLoading(false);
            localStorage.setItem('userToken', response.data.token);
            console.log(response.data);
            router.push('/');
          }
        } catch (error: any) {
          setIsLoading(false);
          setApiError(error.response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      };
      let validationSchema = Yup.object().shape({
        email:Yup.string().email('Email is invalid').required('Email is required'),
        password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Password is invalid').required('Password is required'),
      });
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema,
        onSubmit: handleSignIn
      });
   return (
    <Box sx={{ boxShadow: 20, backgroundColor: 'white', mx: 'auto', my: '40px', width: '30%', borderRadius: '5px', p: 2 }}>
      {apiError && <Typography sx={{textAlign:'center'}} color="error">{apiError}</Typography>}
      <Typography sx={{ textAlign: 'center', pb: 4, fontWeight: 'bold'}} component='h1' variant='h5'>Log in</Typography>
      <Box component="form" onSubmit={formik.handleSubmit} autoComplete="off">
      <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' }}>
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='email'
            name='email'
            label="Email address"
            id="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='password'
            name='password'
            label="Password"
            id="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          </Box>
          <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' ,borderBottom:'solid 1px gray' ,p:1}}>
      <Button 
        fullWidth 
        sx={{mx: 'auto', mb: 4 }} 
        variant="contained"  
        disabled={isLoading}
        type='submit'
      >
        {isLoading ? 'Login...' : 'Log In'}
      </Button>
        </Box>
        <Box sx={{textAlign:'center',my:2,}}>
        <Link href='/signup' underline="hover">
        {'Create new acount'}
      </Link>
        </Box>
          </Box>
          </Box>
   )
 }
 