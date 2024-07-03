'use client'
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { addComment } from '@/lib/commentSlice';
import { useDispatch,useSelector} from 'react-redux';
import toast from 'react-hot-toast';

export default function CreateComment() {
        // const [apiResponse, setApiResponse] = useState<string>('');
        // const [isLoading, setIsLoading] = useState<boolean>(false);
        // let router = useRouter();
        // type FormData = {
        //     content: string;
        //     post: string;
        //   };
          
        // let headers = { token:localStorage.getItem('userToken')};

    //     const createComment  = async (formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    //     setIsLoading(true);
    //     // setApiError('');
    
    //     try {
    //       const response = await axios.post('https://linked-posts.routemisr.com/comments', formValues,{headers});
    
    //       if (response.data.message === 'success') {
    //         setIsLoading(false);
    //         setApiResponse(response.data.posts[16].comments);
    //         router.push('/');
    //         // localStorage.setItem('userToken', response.data.token);
    //         console.log('added comment',response.data.posts);
    //       }
    //     } catch (error: any) {
    //         console.log(error.response)
    //         setIsLoading(false);
    //     //   setApiError(error.response?.data?.message);
    //     }
    // };
    // let validationSchema = Yup.object().shape({
    //     content:Yup.string().required('Content is required'),
    //     post:Yup.string().max(24,'Id must be 24 charcters long').required('Id is required'),
    //   });
    //   const formik = useFormik({
    //     initialValues: {
    //       content: '',
    //       post: '',
    //     },
    //     validationSchema,
    //     onSubmit: createComment
    //   });
    let dispatch = useDispatch<any>();
    let {allPosts,isLoading,isError} = useSelector((state:any)=>state.comments);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const contentInput = form.elements.namedItem('content') as HTMLInputElement;
        const content = contentInput?.value;
        const postInput = form.elements.namedItem('post') as HTMLInputElement;
        const post = postInput?.value;

        if (!content) {
        alert('content is required');
        return;
        }
        if (!post) {
            alert('post is required');
            return;
            }
            const formData = new FormData();
            formData.append('content', content);
            formData.append('post', post);
            try {
              await  dispatch(addComment(formData));
              toast.success('Comment added successfully');
            } catch (error) {
              toast.error('Failed to add comment');
            }

    };
    

  return (
    <>
    <Box component="form" onSubmit={handleSubmit}>
    <Box sx={{ width: 500, maxWidth: '95%',mt:5,mx:'auto' }}>
    <TextField
        required
        fullWidth
        name='content'
          id="content"
          label="Create comment"
          multiline
          rows={4}
        />
    
    </Box >
    <Box sx={{ width: 500, maxWidth: '95%',mt:5,mx:'auto' }}>
    <TextField
        required
        fullWidth
        name='post'
          id="post"
        />   
    </Box >
    <Box  sx={{mx:'auto',mt:2, display:'flex',justifyContent:'center'}}>
    <Button disabled={isLoading} type='submit' variant="contained" startIcon={<ModeCommentIcon />}>
    {isLoading?'Comment..':' Comment'}
     
    </Button>
    </Box>
    </Box>
    </>
  );
};


// 'use client';
// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function CreateComment() {
//   const [content, setContent] = useState<string>('');
//   const [apiResponse, setApiResponse] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [postId, setPostId] = useState<string>(''); // Initialize with the post ID
//   let router = useRouter();

//   const createComment = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('userToken');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const headers = { Authorization: `Bearer ${token}` };
//       const body = {
//         content,
//         post: postId
//       };

//       const response = await axios.post('https://linked-posts.routemisr.com/comments', body, { headers });

//       if (response.data.message === 'success') {
//         setIsLoading(false);
//         setApiResponse(response.data.comment._id);
//         console.log(response.data.comment._id);
//         // Redirect or update the UI after successfully creating the comment
//         router.push(`/posts/${postId}`);
//       } else {
//         setIsLoading(false);
//         setApiResponse('Error creating comment');
//       }
//     } catch (error: any) {
//       console.error(error.response?.data || error.message);
//       setIsLoading(false);
//       setApiResponse(error.response?.data.message || 'An error occurred');
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!content) {
//       alert('Content is required');
//       return;
//     }
//     if (!postId) {
//       alert('Post ID is required');
//       return;
//     }

//     await createComment();
//   };

//   return (
//     <>
//       <Box component="form" onSubmit={handleSubmit}>
//         <Box sx={{ width: 500, maxWidth: '95%', mt: 5, mx: 'auto' }}>
//           <TextField
//             name="content"
//             required
//             fullWidth
//             id="content"
//             label="Comment"
//             multiline
//             rows={4}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </Box>
//         <Box sx={{ width: 500, maxWidth: '95%', mt: 2, mx: 'auto' }}>
//           <TextField
//             name="postId"
//             required
//             fullWidth
//             id="postId"
//             label="Post ID"
//             value={postId}
//             onChange={(e) => setPostId(e.target.value)}
//           />
//         </Box>
//         <Box sx={{ mx: 'auto', mt: 2, display: 'flex', justifyContent: 'center' }}>
//           <Button disabled={isLoading} type="submit" variant="contained">
//             {isLoading ? 'Creating Comment...' : 'Create Comment'}
//           </Button>
//         </Box>
//         {apiResponse && <Box sx={{ mx: 'auto', mt: 2, textAlign: 'center' }}>{apiResponse}</Box>}
//       </Box>
//     </>
//   );
// }