'use client'
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { addPost } from '@/lib/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

  
export default function CreatePost() {
    
   
    let dispatch = useDispatch<any>();
    let {allPosts,isLoading,isError} = useSelector((state:any)=>state.posts);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const imageInput = form.elements.namedItem('image') as HTMLInputElement;
        const image = imageInput?.files?.[0];
        const bodyInput = form.elements.namedItem('body') as HTMLInputElement;
        const body = bodyInput?.value;

        if (!body) {
        alert('Body is required');
        return;
        }
        if (!image) {
            alert('Image is required');
            return;
            }
            const formData = new FormData();
            formData.append('body', body);
            formData.append('image', image);
            try {
              await  dispatch(addPost(formData));
              toast.success('Post added successfully');
            } catch (error) {
              toast.error('Failed to add post');
            };
            // dispatch(addPost(formData)); 
    };
    

  return (
    <>
    <Box component="form" onSubmit={handleSubmit}>
    <Box sx={{ width: 500, maxWidth: '95%',mt:5,mx:'auto' }}>
    <TextField
     required
        fullWidth
        name='body'
          id="body"
          label="What do you think?"
          multiline
          rows={4}
        />
    
    </Box >
    <Box sx={{ width: 500, maxWidth: '95%', marginX: 'auto' }}>
          <TextField
            size='small'
            sx={{ mt: 1 }}
            fullWidth
            type='file'
            name='image'
            id="postphoto"
          />
          </Box>
    <Box  sx={{mx:'auto',mt:2, display:'flex',justifyContent:'center'}}>
    <Button disabled={isLoading} type='submit' variant="contained" endIcon={<SendIcon />}>
    {isLoading?'Post..':' Post'}
     
    </Button>
    </Box>
    </Box>
    </>
  )
}
