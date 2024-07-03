import {configureStore} from '@reduxjs/toolkit';
import {postsReducer} from "./postSlice";
import {commentsReducer} from './commentSlice';
export let store = configureStore({
    reducer:{
        posts:postsReducer,
        comments:commentsReducer
    }
});