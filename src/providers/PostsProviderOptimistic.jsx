import apiService from './apiService';
import { useState } from 'react';
import { use } from 'react';
import useFulOptimistic from '../hooks/useFulOptimistic';
import PostsContext from './PostContext';
import useOptimisticState from '../hooks/useOptimisticState';

const initPromise = apiService.getPosts();
export default function PostsProviderOptimistic({ children }) {
  /*************
   *  DEFAULT  *
   *************/
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

  /**********************
   *  useFulOptimistic  *
   **********************/

  // const [posts, setPosts] = useState(use(initPromise));
  // const makeOptimistic = useFulOptimistic(posts, setPosts);

  // const addPostHandler = makeOptimistic(async (formData) => {
  //   const optimisticPost = {
  //     id: -100,
  //     optimistic: true,
  //     ...Object.fromEntries(formData),
  //   };
  //   setPosts((prev) => [optimisticPost, ...prev]);
  //   const newPost = await apiService.createPost(formData);
  //   setPosts([newPost, ...posts]);
  // });

  // const deletePostHandler = makeOptimistic(async (postId) => {
  //   setPosts((prev) => prev.filter((post) => post.id !== postId));
  //   await apiService.deletePost(postId);
  // });

  // const updatePostHandler = makeOptimistic(async (postId, data) => {
  //   setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...data } : post)));
  //   await apiService.updatePost(postId, data);
  // });

  /**********************
   * useOptimisticState *
   **********************/

  const [posts, setPosts] = useOptimisticState(use(initPromise));

  const addPostHandler = async (formData) => {
    const optimisticPost = {
      id: -100,
      optimistic: true,
      ...Object.fromEntries(formData),
    };
    return setPosts(
      apiService.createPost(formData).then((newPost) => [newPost, ...posts]),
      [optimisticPost, ...posts],
    );
  };

  const deletePostHandler = async (postId) => {
    const filtered = posts.filter((post) => post.id !== postId);
    return setPosts(apiService.deletePost(postId), filtered);
  };

  const updatePostHandler = async (postId, data) => {
    const updated = posts.map((post) => (post.id === postId ? { ...post, ...data } : post));
    return setPosts(apiService.updatePost(postId, data), updated);
  };

  return (
    <PostsContext value={{ posts, setPosts, addPostHandler, deletePostHandler, updatePostHandler }}>
      {children}
    </PostsContext>
  );
}
