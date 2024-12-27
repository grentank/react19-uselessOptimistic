import apiService from './apiService';
import { useOptimistic as useLessOptimistic, useState } from 'react';
import { use } from 'react';
import PostsContext from './PostContext';

const initPromise = apiService.getPosts();
export default function PostsProvider({ children }) {
  /*************************
   *  БЕЗ ОПТИМИСТИЧНОСТИ  *
   *************************/
  // const [posts, setPosts] = useState(use(initPromise));

  // const addPostHandler = async (formData) => {
  //   const newPost = await apiService.createPost(formData);
  //   setPosts((prev) => [newPost, ...prev]);
  // };

  // const deletePostHandler = async (postId) => {
  //   await apiService.deletePost(postId);
  //   setPosts((prev) => prev.filter((post) => post.id !== postId));
  // };

  // const updatePostHandler = async (postId, data) => {
  //   await apiService.updatePost(postId, data);
  //   setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...data } : post)));
  // };

  /***********************
   *  КАСТОМНОЕ РЕШЕНИЕ  *
   ***********************/

  // const [posts, setPosts] = useState(use(initPromise));

  // const addPostHandler = async (formData) => {
  //   const prevPosts = posts;
  //   try {
  //     const optimisticPost = {
  //       id: -100,
  //       optimistic: true,
  //       ...Object.fromEntries(formData),
  //     };
  //     setPosts((prev) => [optimisticPost, ...prev]);
  //     const newPost = await apiService.createPost(formData);
  //     setPosts([newPost, ...prevPosts]);
  //   } catch (error) {
  //     setPosts(prevPosts);
  //   }
  // };

  // const deletePostHandler = async (postId) => {
  //   const prevPosts = posts;
  //   try {
  //     setPosts((prev) => prev.filter((post) => post.id !== postId));
  //     await apiService.deletePost(postId);
  //   } catch (error) {
  //     setPosts(prevPosts);
  //   }
  // };

  // const updatePostHandler = async (postId, data) => {
  //   const prevPosts = posts;
  //   try {
  //     setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...data } : post)));
  //     await apiService.updatePost(postId, data);
  //   } catch (error) {
  //     setPosts(prevPosts);
  //   }
  // };

  /***********************
   *  uselessOptimistic  *
   ***********************/

  const [posts, setPosts] = useState(use(initPromise));
  // const [optimisticPosts, optimisticAddPost] = useLessOptimistic(posts, (state, formData) => {
  //   const optimisticPost = {
  //     id: -100,
  //     optimistic: true,
  //     ...Object.fromEntries(formData),
  //   };
  //   return [optimisticPost, ...state];
  // });

  // const addPostHandler = async (formData) => {
  //   try {
  //     optimisticAddPost(formData);
  //     const newPost = await apiService.createPost(formData);
  //     setPosts((prev) => [newPost, ...prev]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [optimisticPosts, optimisticDispatch] = useLessOptimistic(
    posts,
    (state, { type, payload }) => {
      switch (type) {
        case 'ADD':
          return [
            {
              id: -100,
              optimistic: true,
              ...Object.fromEntries(payload),
            },
            ...state,
          ];
        case 'DELETE':
          return state.filter((post) => post.id !== payload);
        case 'UPDATE':
          return state.map((post) =>
            post.id === payload.id ? { ...post, ...payload.data } : post,
          );

        default:
          return state;
      }
    },
  );

  const addPostHandler = async (formData) => {
    try {
      optimisticDispatch({ type: 'ADD', payload: formData });
      const newPost = await apiService.createPost(formData);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      optimisticDispatch({ type: 'DELETE', payload: postId });
      await apiService.deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostHandler = async (postId, data) => {
    try {
      optimisticDispatch({ type: 'UPDATE', payload: { id: postId, data } });
      await apiService.updatePost(postId, data);
      setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...data } : post)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostsContext
      value={{
        posts: optimisticPosts,
        setPosts,
        addPostHandler,
        deletePostHandler,
        updatePostHandler,
      }}
    >
      {children}
    </PostsContext>
  );
}
