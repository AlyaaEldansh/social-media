'use client'
import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
// import { useRouter } from 'next/navigation';

// let router = useRouter();
const headers = { token:localStorage.getItem('userToken')};
export let addComment = createAsyncThunk('commentSlice/addComment',async(formData)=>{
    let response = await fetch('https://linked-posts.routemisr.com/comments',{
        body: JSON.stringify({
            content: formData.get('content'),
            post: formData.get('post')
        }),
        method:'POST',
        headers: {
            ...headers,
            'Content-Type': "application/json"
        },
        })
    let data = await response.json();
    // router.push('/');
    console.log(data);
    return data;
});
export let updateComment = createAsyncThunk('commentSlice/updateComment',async(postId,formData)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/comments/${postId}`,{
        body:JSON.stringify({
           content: formData.get('content'),
        }),
        method:'PUT',
        headers:{
            ...headers,
            'Content-Type': "application/json"
        },
        })
    let data = await response.json();
    // router.push('/');
    console.log(data);
    return data;
});
export let deleteComment = createAsyncThunk('commentSlice/deletePost',async(commentId)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/comments/${commentId}`,{
        method:'DELETE',
        headers:headers,
        })
    let data = await response.json();
    // router.push('/');
    console.log(data);
    return data;
})

let initialState = {allComments:[],isLoading:false,isError:null};
let CommentsSlice = createSlice({
    name:'CommentsSlice',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(addComment.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allComments = action.payload.posts;
            console.log(state.allComments);
        }),
        builder.addCase(addComment.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(addComment.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(updateComment.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allComments = action.payload;
            // console.log('updated');
        }),
        builder.addCase(updateComment.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(updateComment.rejected,(state,action)=>{
            state.isLoading = true;
            state.isError = action.payload;
        })
        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            // state.allPosts = action.payload.posts.comments;
            state.isLoading = false;
            // console.log('deleted');
        }),
        builder.addCase(deleteComment.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(deleteComment.rejected,(state,action)=>{
            state.isLoading = true;
            state.isError = action.payload;
            
        })
    },
    reducers:{

    }
});

export let commentsReducer = CommentsSlice.reducer;