'use client'
import axios from 'axios';
import React, { createContext, useState } from 'react'

export let PostContext = createContext<any | undefined>(undefined);
export default function PostContextProvider({chlidren}:any) 
{
    const [apiError, setApiError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let headers = { token:localStorage.getItem('userToken')};

   async function deletePost(postId:any){
        setIsLoading(true);
        try{
            const response = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {headers});
    
          if (response.data.message === 'success') {
            setIsLoading(false);
            console.log(response.data);

        }}
        catch (error: any) {
            setIsLoading(false);
            setApiError(error.response?.data?.message);
          } } ;
    

  return (<>
    <PostContext.Provider value={{ deletePost }}>
        {chlidren}
    </PostContext.Provider>
    </>
  )
};
