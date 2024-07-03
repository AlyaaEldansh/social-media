'use client'
import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
// import { useRouter } from 'next/navigation';


const headers = { token:localStorage.getItem('userToken')};
export let getAllPosts = createAsyncThunk('postsSlice/getAllPosts',async()=>{
    let response = await fetch('https://linked-posts.routemisr.com/posts?limit=50',{
        method:'GET',
        headers:headers,
        })
    let data = await response.json();
    console.log(data);
    return data;
});
export let addPost = createAsyncThunk('postsSlice/addPost',async(formData)=>{
    let response = await fetch('https://linked-posts.routemisr.com/posts',{
        body:formData,
        method:'POST',
        headers:headers,
        })
    let data = await response.json();
    console.log(data);
    return data;
});
export let updatePost = createAsyncThunk('postsSlice/updatePost',async(postId,formData)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`,{
        body:formData,
        method:'PUT',
        headers:{ ...headers,
            'Content-Type': 'application/form-data'
        }
        })
    let data = await response.json();
    console.log(data);
    return data;
});
export let deletePost = createAsyncThunk('postsSlice/deletePost',async(postId)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`,{
        method:'DELETE',
        headers:headers,
        })
    let data = await response.json();
    console.log(data);
    return data;
});
export let uploadPhoto = createAsyncThunk('postsSlice/uploadPhoto',async(formData)=>{
    let response = await fetch(`https://linked-posts.routemisr.com/users/upload-photo`,{
        body:formData,
        method:'PATCH',
        headers:headers,
        })
    let data = await response.json();
    console.log(data);
    return data;
});
export let getUserPost = createAsyncThunk('postsSlice/getUserPost',async( )=>{
    let response = await fetch(`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=2`,{
        method:'GET',
        headers:headers,
        })
    let data = await response.json();
    console.log(data);
    return data;
})

let initialState = {allPosts:[],userPost:[],userPhoto:null,isLoading:false,isError:null};
let PostsSlice = createSlice({
    name:'PostsSlice',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllPosts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allPosts = action.payload.posts;
        }),
        builder.addCase(getAllPosts.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(getAllPosts.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(addPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allPosts = action.payload.posts;
            console.log(state.allPosts);
        }),
        builder.addCase(addPost.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(addPost.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(updatePost.fulfilled,(state,action)=>{
            // state.allPosts = action.payload.posts;
            state.isLoading = false;
        }),
        builder.addCase(updatePost.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(updatePost.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(deletePost.fulfilled,(state,action)=>{
            state.allPosts = action.payload.posts;
            state.isLoading = false;
            // console.log('deleted');
        }),
        builder.addCase(deletePost.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(deletePost.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(uploadPhoto.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.userPhoto = action.payload;
            console.log(state.userPhoto);
        }),
        builder.addCase(uploadPhoto.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(uploadPhoto.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
        builder.addCase(getUserPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.userPost = action.payload.posts;
        }),
        builder.addCase(getUserPost.pending,(state,action)=>{
            state.isLoading = true;
        }),
        builder.addCase(getUserPost.rejected,(state,action)=>{
            state.isError = action.payload;
            state.isLoading = true;
        })
    },
    reducers:{

    }
});

export let postsReducer = PostsSlice.reducer;