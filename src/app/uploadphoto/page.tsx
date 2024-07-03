'use client'
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import axios from 'axios';
import { uploadPhoto } from '@/lib/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


 export default function UploadPhoto() {
    
      // let headers = { token:localStorage.getItem('userToken')};

      let dispatch = useDispatch<any>();
      let {allPosts,isLoading,isError} = useSelector((state:any)=>state.posts);
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const photoInput = form.elements.namedItem('profilphoto') as HTMLInputElement;
        const photo = photoInput?.files?.[0];
        if (!photo) {
            alert('Photo is required');
            return;
            }
            const formData = new FormData();
            formData.append('photo', photo);
            try {
              await dispatch(uploadPhoto(formData)); 
              toast.success('Profile photo uploaded successfully');
            } catch (error) {
              toast.error('Failed to upload profile photo');
            }
    };

   return (
    <Box sx={{ boxShadow: 20, backgroundColor: 'white', mx: 'auto', my: '40px', width: '30%', borderRadius: '5px', p: 2 }}>
      <Typography sx={{ textAlign: 'center', pb: 4, fontWeight: 'bold'}} component='h1' variant='h5'>Upload profil photo</Typography>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
      <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' }}>
          <TextField
            size='small'
            sx={{ mb: 1 }}
            fullWidth
            type='file'
            name='profilphoto'
            id="profilphoto"
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
            {isLoading ? 'Upload...' : 'Upload'}
          </Button>
            </Box>
          </Box>
          </Box>
   )
 }
 