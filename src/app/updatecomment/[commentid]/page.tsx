'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { updateComment } from '@/lib/commentSlice';
import { useDispatch,useSelector} from 'react-redux';
import toast from 'react-hot-toast';

// import { useRouter as useNavigationRouter } from 'next/navigation';

export default function UpdateComment({ params }: { params: { commentid: string } }) {
        const commentId = params.commentid;
        console.log({commentId});
      let dispatch = useDispatch<any>();
      let {allComments,isLoading,isError} = useSelector((state:any)=>state.comments);
      
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const form = event.currentTarget;
            const contentInput = form.elements.namedItem('content') as HTMLInputElement;
            const content =contentInput?.value;


            if (!content) {
            alert('content is required');
            return;
            }
                const formData = new FormData();
                formData.append('content', content);
                try {
                  await  dispatch(updateComment(commentId,formData));
                  toast.success('Comment updated successfully');
                } catch (error) {
                  toast.error('Failed to update comment');
                }
                  };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit}>
    <Box sx={{ width: 500, maxWidth: '95%',mt:5,mx:'auto' }}>
    <TextField
        name='content'
         required
        fullWidth
        id="content"
        label="Update Comment"
        multiline
        rows={4}
        />
    </Box>
    <Box sx={{mx:'auto',mt:2, display:'flex',justifyContent:'center'}}>
    <Button disabled={isLoading} type='submit' variant="contained" startIcon={<EditIcon/>}>
      {isLoading?'Update Comment...':'Update Comment'}
    </Button>
    </Box>
    </Box>
    </>
  )
};