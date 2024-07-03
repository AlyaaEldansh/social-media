'use client'
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

export default function SignUp() {

  type FormValues = {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  };
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setIsLoading(true);
    setApiError('');

    try {
      const response = await axios.post('https://linked-posts.routemisr.com/users/signup', formValues);

      if (response.data.message === 'success') {
        setIsLoading(false);
        // localStorage.setItem('userToken', response.data.token);
        console.log(response.data);
        router.push('/signin');
      }
    } catch (error: any) {
      setIsLoading(false);
      setApiError(error.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  let validationSchema = Yup.object().shape({
    name:Yup.string().min(5,'Name must be at least 5 characters long').max(20,'Name must be at most 20 characters long').required('Name is required'),
    email:Yup.string().email('Email is invalid').required('Email is required'),
    password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Password is invalid').required('Password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and Repassword must be the same').required('Repassword is required'),
    dateOfBirth:Yup.string().required('Date is required'),
    gender:Yup.string().oneOf(['male','female'],'Gender is invalid').required('Gender is required')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    validationSchema,
    onSubmit: handleSignUp
  });
  return (
    <Box sx={{ boxShadow: 20, backgroundColor: 'white', mx: 'auto', my: '40px', width: '30%', borderRadius: '5px', p: 2 }}>
      {apiError && <Typography sx={{textAlign:'center'}} color="error">{apiError}</Typography>}
      <Typography sx={{ textAlign: 'center', pb: 4, fontWeight: 'bold', borderBottom: '1px solid gray' }} component='h1' variant='h5'>Create a new account</Typography>
      <Box component="form" onSubmit={formik.handleSubmit} autoComplete="off">
        <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto', mt: 1 }}>
          <TextField
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='text'
            name='name'
            label="Your name"
            id="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>

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
          <TextField
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='password'
            name='rePassword'
            label="Re-password"
            id="rePassword"
            error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
            helperText={formik.touched.rePassword && formik.errors.rePassword}
          />
        </Box>

        <Typography sx={{ pl: 1, color: 'gray' }}>Date of birth</Typography>
        <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' }}>
          <TextField
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='date'
            name='dateOfBirth'
            id="dateOfBirth"
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </Box>

        <FormControl sx={{ pl: 1, mx: 'auto' }}>
          <Typography sx={{ color: 'gray' }}>Gender</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        
        <Box>
        
          <Button type='submit' sx={{ display: 'block', mx: 'auto' }} variant="contained" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </Box>
        <Box sx={{textAlign:'center',my:2,}} >
        <Link href='/signin' underline="hover">
        {'Already have an account?'}
      </Link>
        </Box>
      </Box>
    </Box>
  );
};

