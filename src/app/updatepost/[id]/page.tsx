'use client'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { updatePost } from '@/lib/postSlice';
import { useDispatch,useSelector} from 'react-redux';
import toast from 'react-hot-toast';
// import { useRouter as useNavigationRouter } from 'next/navigation';


export default function UpdatePost({ params }: { params: { id: string } }) {
        const postId = params.id;

        console.log({postId})
        let dispatch = useDispatch<any>();
      
      let {allPosts,isLoading,isError} = useSelector((state:any)=>state.posts);
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const form = event.currentTarget;
            const imageInput = form.elements.namedItem('image') as HTMLInputElement;
            const image = imageInput?.files?.[0];
            const bodyInput = form.elements.namedItem('updatepost') as HTMLInputElement;
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
                  await  dispatch(updatePost(postId, formData ));
                  toast.success('Post updated successfully');
                } catch (error) {
                  toast.error('Failed to update post');
                }
        };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit}>
    <Box sx={{ width: 500, maxWidth: '95%',mt:5,mx:'auto' }}>
    <TextField
        name='updatepost'
         required
        fullWidth
        id="updatepost"
        label="Update Post"
        multiline
        rows={4}
        />
    </Box>
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
    <Box sx={{mx:'auto',mt:2, display:'flex',justifyContent:'center'}}>
    <Button disabled={isLoading} type='submit' variant="contained" startIcon={<EditIcon/>}>
      {isLoading?'Update Post...':'Update Post'}
    </Button>
    </Box>
    </Box>
    </>
  )
}
