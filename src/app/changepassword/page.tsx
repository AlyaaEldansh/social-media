'use client'
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

 export default function ChangePassword() {
    type FormValues = {
        password: string;
        newPassword:string;
      };
      

      const [apiError, setApiError] = useState<string>('');
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const router = useRouter();

      let headers = { token:localStorage.getItem('userToken')};
      const handlechangePassword = async (formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setIsLoading(true);
        // setApiError('');
    
        try {
          const response = await axios.patch('https://linked-posts.routemisr.com/users/change-password', formValues,{headers});
    
          if (response.data.message === 'success') {
            setIsLoading(false);
            router.push('/signin');
            localStorage.setItem('userToken', response.data.token);
            console.log(response.data);
          }
        } catch (error: any) {
          setIsLoading(false);
          setApiError(error.response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      };
      let validationSchema = Yup.object().shape({
        password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Password is invalid').required('Password is required'),
        newPassword:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Password is invalid').required('newpassword is required'),

      });
      const formik = useFormik({
        initialValues: {
          password: '',
          newPassword:''
        },
        validationSchema,
        onSubmit: handlechangePassword
      });
   return (
    <Box sx={{ boxShadow: 20, backgroundColor: 'white', mx: 'auto', my: '40px', width: '30%', borderRadius: '5px', p: 2 }}>
      {apiError && <Typography sx={{textAlign:'center'}} color="error">{apiError}</Typography>}
      <Typography sx={{ textAlign: 'center', pb: 4, fontWeight: 'bold'}} component='h1' variant='h5'>Change password</Typography>
      <Box component="form" onSubmit={formik.handleSubmit} autoComplete="off">
      <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' }}>
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
          <TextField
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='password'
            name='newPassword'
            label="newPassword"
            id="newPassword"
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          </Box>
          <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' ,p:1}}>
      <Button 
        fullWidth 
        sx={{mx: 'auto', mb: 4 }} 
        variant="contained"  
        disabled={isLoading}
        type='submit'
      >
        {isLoading ? 'Change...' : 'Change'}
      </Button>
        </Box>
          </Box>
          </Box>
   )
 }
 